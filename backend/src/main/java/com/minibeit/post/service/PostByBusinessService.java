package com.minibeit.post.service;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
import com.minibeit.common.component.file.S3Uploader;
import com.minibeit.common.dto.PageDto;
import com.minibeit.common.dto.SavedFile;
import com.minibeit.post.domain.*;
import com.minibeit.post.domain.repository.*;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.dto.PostResponse;
import com.minibeit.post.service.exception.ExistApprovedApplicant;
import com.minibeit.post.service.exception.PostNotFoundException;
import com.minibeit.school.domain.School;
import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.user.domain.User;
import com.minibeit.user.service.exception.SchoolNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PostByBusinessService {
    private final PostRepository postRepository;
    private final SchoolRepository schoolRepository;
    private final BusinessProfileRepository businessProfileRepository;
    private final PostDoDateRepository postDoDateRepository;
    private final PostApplicantRepository postApplicantRepository;
    private final RejectPostRepository rejectPostRepository;
    private final PostPermissionCheck postPermissionCheck;
    private final S3Uploader s3Uploader;
    private final PostFileRepository postFileRepository;

    public PostResponse.OnlyId createInfo(PostRequest.CreateInfo request, User user) {
        postPermissionCheck.userInBusinessProfileCheck(request.getBusinessProfileId(), user);

        School school = schoolRepository.findById(request.getSchoolId()).orElseThrow(SchoolNotFoundException::new);
        BusinessProfile businessProfile = businessProfileRepository.findById(request.getBusinessProfileId()).orElseThrow(BusinessProfileNotFoundException::new);

        Post post = Post.create(request, school, businessProfile);
        Post savedPost = postRepository.save(post);

        List<PostDoDate> postDoDateList = request.getDoDateList().stream().map(doDate -> PostDoDate.create(doDate.getDoDate(), post)).collect(Collectors.toList());
        postDoDateRepository.saveAll(postDoDateList);

        return PostResponse.OnlyId.build(savedPost);
    }

    public PostResponse.OnlyId addFiles(Long postId, PostRequest.AddFile request, User user) {
        Post post = postRepository.findByIdWithBusinessProfile(postId).orElseThrow(PostNotFoundException::new);
        postPermissionCheck.userInBusinessProfileCheck(post.getBusinessProfile().getId(), user);

        List<SavedFile> savedFiles = new ArrayList<>();
        if (request.getFiles() != null) {
            savedFiles = s3Uploader.uploadFileList(request.getFiles());
        }
        List<PostFile> postFiles = savedFiles.stream().map(savedFile -> PostFile.create(post, savedFile)).collect(Collectors.toList());
        postFileRepository.saveAll(postFiles);

        return PostResponse.OnlyId.build(post);
    }

    public void recruitmentCompleted(Long postId, PostRequest.RejectComment request, User user) {
        Post post = postRepository.findByIdWithBusinessProfile(postId).orElseThrow(PostNotFoundException::new);
        postPermissionCheck.userInBusinessProfileCheck(post.getBusinessProfile().getId(), user);

        List<PostApplicant> approvedApplicantList = postApplicantRepository.findAllByApplyStatus(postId, ApplyStatus.APPROVE);
        approvedApplicantList.forEach( postApplicant -> postApplicant.getUser().approvedAlarmOn());

        List<PostApplicant> rejectedApplicantList = postApplicantRepository.findAllByApplyStatus(postId, ApplyStatus.WAIT);
        rejectedApplicantList.forEach(postApplicant -> postApplicant.getUser().rejectedAlarmOn());

        List<Long> applicantIdList = rejectedApplicantList.stream().map(PostApplicant::getId).collect(Collectors.toList());
        postApplicantRepository.updateReject(applicantIdList, ApplyStatus.REJECT);

        List<RejectPost> rejectPostList = rejectedApplicantList.stream()
                .map(postApplicant -> RejectPost.create(post.getTitle(), post.getPlace(), post.getContact(), post.getDoTime(), postApplicant.getPostDoDate().getDoDate(), request.getRejectComment(), postApplicant.getUser())).collect(Collectors.toList());
        rejectPostRepository.saveAll(rejectPostList);

        post.completed();
    }

    @Transactional(readOnly = true)
    public Page<PostResponse.GetListByBusinessProfile> getListByBusinessProfile(Long businessProfileId, PostStatus postStatus, LocalDateTime now, PageDto pageDto) {
        Page<Post> posts = postRepository.findAllByBusinessProfileId(businessProfileId, postStatus, now, pageDto.of());
        return posts.map(PostResponse.GetListByBusinessProfile::build);
    }

    @Transactional(readOnly = true)
    public PostResponse.DoDateList getDoDateListByYearMonth(Long postId, YearMonth yearMonth) {
        List<PostDoDate> postDoDateList = postDoDateRepository.findAllByPostIdAndYearMonth(postId, yearMonth);
        return PostResponse.DoDateList.build(postDoDateList);
    }

    public PostResponse.OnlyId updateContent(Long postId, PostRequest.UpdateContent request, User user) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        postPermissionCheck.userInBusinessProfileCheck(post.getBusinessProfile().getId(), user);

        post.updateContent(request.getUpdatedContent());

        return PostResponse.OnlyId.build(post);
    }

    public void deleteOne(Long postId, LocalDateTime now, User user) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        postPermissionCheck.userInBusinessProfileCheck(post.getBusinessProfile().getId(), user);

        if (postApplicantRepository.existsApproveAfterNow(postId, now)) {
            throw new ExistApprovedApplicant();
        }

        postRepository.deleteById(postId);
    }
}
