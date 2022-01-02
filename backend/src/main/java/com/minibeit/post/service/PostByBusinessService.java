package com.minibeit.post.service;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
import com.minibeit.common.dto.PageDto;
import com.minibeit.file.service.S3Uploader;
import com.minibeit.file.service.dto.SavedFile;
import com.minibeit.post.domain.*;
import com.minibeit.post.domain.repository.*;
import com.minibeit.post.service.dto.PostRequest;
import com.minibeit.post.service.dto.PostResponse;
import com.minibeit.post.service.exception.PostNotFoundException;
import com.minibeit.school.domain.School;
import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.user.domain.User;
import com.minibeit.user.service.exception.SchoolNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
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
    private final PostValidator postValidator;
    private final S3Uploader s3Uploader;
    private final PostFileRepository postFileRepository;

    public PostResponse.OnlyId create(PostRequest.CreateInfo request, List<MultipartFile> files, MultipartFile thumbnail, User user) {
        School school = schoolRepository.findById(request.getSchoolId()).orElseThrow(SchoolNotFoundException::new);
        BusinessProfile businessProfile = businessProfileRepository.findById(request.getBusinessProfileId()).orElseThrow(BusinessProfileNotFoundException::new);

        postValidator.userInBusinessProfileValidate(businessProfile.getId(), user);

        Post post = request.toEntity();
        post.create(school, businessProfile);
        Post savedPost = postRepository.save(post);

        List<PostDoDate> postDoDates = request.toPostDoDates().stream().map(postDoDate -> postDoDate.assignPost(post)).collect(Collectors.toList());
        postDoDateRepository.saveAll(postDoDates);

        if (thumbnail != null) {
            SavedFile uploadedThumbnail = s3Uploader.upload(thumbnail);
            PostFile createdThumbnail = PostFile.create(post, uploadedThumbnail.toPostFile());
            post.updateThumbnail(createdThumbnail.getUrl());
            postFileRepository.save(createdThumbnail);
        }

        if (files != null) {
            List<SavedFile> savedFiles = s3Uploader.uploadFileList(files);
            List<PostFile> postFiles = savedFiles.stream().map(savedFile -> PostFile.create(post, savedFile.toPostFile())).collect(Collectors.toList());
            postFileRepository.saveAll(postFiles);
        }

        return PostResponse.OnlyId.build(savedPost);
    }

    public void recruitmentCompleted(Long postId, PostRequest.RejectComment request, User user) {
        Post post = postRepository.findByIdWithBusinessProfile(postId).orElseThrow(PostNotFoundException::new);
        BusinessProfile businessProfile = post.getBusinessProfile();

        postValidator.userInBusinessProfileValidate(businessProfile.getId(), user);

        post.completed();

        List<PostApplicant> rejectedApplicantList = postApplicantRepository.findAllByPostIdAndApplyStatus(postId, ApplyStatus.WAIT);

        List<Long> applicantIdList = rejectedApplicantList.stream().map(PostApplicant::getId).collect(Collectors.toList());
        postApplicantRepository.updateReject(applicantIdList, ApplyStatus.REJECT);

        List<RejectPost> rejectPostList = rejectedApplicantList.stream()
                .map(postApplicant -> RejectPost.create(post, postApplicant.getPostDoDate(), businessProfile, user, request.toEntity().getRejectComment())).collect(Collectors.toList());
        rejectPostRepository.saveAll(rejectPostList);
    }

    @Transactional(readOnly = true)
    public Page<PostResponse.GetListByBusinessProfile> getListByBusinessProfile(Long businessProfileId, PostStatus postStatus, PageDto pageDto) {
        Page<Post> posts = postRepository.findAllByBusinessProfileId(businessProfileId, postStatus, pageDto.of());
        return posts.map(PostResponse.GetListByBusinessProfile::build);
    }

    @Transactional(readOnly = true)
    public PostResponse.GetBusinessStatus getCountBusinessCompletePostAndReview(Long businessProfileId) {
        return postRepository.countByPostStatusCompleteAndReview(businessProfileId);
    }

    public PostResponse.OnlyId updateContent(Long postId, PostRequest.UpdateContent request, User user) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        postValidator.userInBusinessProfileValidate(post.getBusinessProfile().getId(), user);
        post.updateContent(request.toEntity());

        return PostResponse.OnlyId.build(post);
    }

    public void deleteOne(Long postId, LocalDateTime now, User user) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        postValidator.deleteValidate(post.getBusinessProfile().getId(), postId, now, user);
        if (post.getPostFileList() != null) {
            for (PostFile postFile : post.getPostFileList()) {
                s3Uploader.delete(postFile.getName());
            }
        }
        postRepository.deleteById(postId);
    }
}
