package com.minibeit.post.service;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.service.integrate.BusinessProfiles;
import com.minibeit.common.dto.PageDto;
import com.minibeit.post.domain.*;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.PostLikeRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.domain.repository.RejectPostRepository;
import com.minibeit.post.service.dto.PostRequest;
import com.minibeit.post.service.dto.PostResponse;
import com.minibeit.post.service.exception.PostNotFoundException;
import com.minibeit.post.service.integrate.PostFiles;
import com.minibeit.school.domain.School;
import com.minibeit.school.service.integrate.Schools;
import com.minibeit.user.domain.User;
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
    private final PostApplicantRepository postApplicantRepository;
    private final RejectPostRepository rejectPostRepository;
    private final PostValidator postValidator;
    private final PostLikeRepository postLikeRepository;
    private final Schools schools;
    private final BusinessProfiles businessProfiles;
    private final PostFiles postFiles;

    public PostResponse.OnlyId create(PostRequest.CreateInfo request, List<MultipartFile> files, MultipartFile thumbnail, User user) {
        School school = schools.getOne(request.getSchoolId());
        BusinessProfile businessProfile = businessProfiles.getOne(request.getBusinessProfileId());

        postValidator.userInBusinessProfileValidate(businessProfile.getId(), user);

        Post post = request.toEntity();
        PostFile uploadThumbnail = postFiles.upload(post, thumbnail);
        List<PostFile> uploadPostFileList = postFiles.uploadFiles(post, files);
        post.create(school, businessProfile, request.toPostDoDates(), uploadThumbnail, uploadPostFileList);
        Post savedPost = postRepository.save(post);

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
    public PostResponse.GetBusinessStatus getCountBusinessCompletePostAndReview(String status, Long businessProfileId) {
        return postRepository.countByBusinessPostStatus(status, businessProfileId);
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
        postLikeRepository.deleteAllByPostId(postId);
        post.delete();
    }
}
