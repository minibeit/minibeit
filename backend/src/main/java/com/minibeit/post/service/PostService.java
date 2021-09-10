package com.minibeit.post.service;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
import com.minibeit.common.dto.PageDto;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.*;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostLikeRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.domain.repository.PostReviewRepository;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.dto.PostResponse;
import com.minibeit.post.service.exception.PostNotFoundException;
import com.minibeit.school.domain.School;
import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.security.userdetails.CustomUserDetails;
import com.minibeit.user.domain.User;
import com.minibeit.user.service.exception.SchoolNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final SchoolRepository schoolRepository;
    private final PostFileService postFileService;
    private final BusinessProfileRepository businessProfileRepository;
    private final UserBusinessProfileRepository userBusinessProfileRepository;
    private final PostDoDateRepository postDoDateRepository;
    private final PostLikeRepository postLikeRepository;
    private final PostReviewRepository postReviewRepository;

    public PostResponse.OnlyId createInfo(PostRequest.CreateInfo request, User user) {
        permissionCheck(request.getBusinessProfileId(), user);

        School school = schoolRepository.findById(request.getSchoolId()).orElseThrow(SchoolNotFoundException::new);
        BusinessProfile businessProfile = businessProfileRepository.findById(request.getBusinessProfileId()).orElseThrow(BusinessProfileNotFoundException::new);
        List<PostFile> postFiles = postFileService.uploadFiles(request.getFiles());

        Post post = Post.create(request, school, businessProfile, postFiles);
        Post savedPost = postRepository.save(post);

        return PostResponse.OnlyId.build(savedPost);
    }

    public PostResponse.OnlyId createDateRule(Long postId, PostRequest.CreateDateRule request, User user) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        permissionCheck(post.getBusinessProfile().getId(), user);
        post.updateDate(request);
        List<PostDoDate> postDoDateList = request.getDoDateList().stream().map(doDate -> PostDoDate.create(doDate, post)).collect(Collectors.toList());
        postDoDateRepository.saveAll(postDoDateList);
        return PostResponse.OnlyId.build(post);
    }

    public void createOrDeletePostLike(Long postId, User user) {
        Optional<PostLike> findPostLike = postLikeRepository.findByPostIdAndCreatedBy(postId, user);
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        if (findPostLike.isEmpty()) {
            PostLike postLike = PostLike.create(post);
            postLikeRepository.save(postLike);
        } else {
            postLikeRepository.delete(findPostLike.get());
        }
    }

    public PostResponse.PostReviewId createReview(Long postId, PostRequest.CreateReview request) {
        //TODO 해당 게시물에 참여한 사람인지 확인 필요
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        PostReview postReview = PostReview.create(post, request);
        PostReview savedPostReview = postReviewRepository.save(postReview);
        return PostResponse.PostReviewId.build(savedPostReview);
    }

    @Transactional(readOnly = true)
    public PostResponse.GetOne getOne(Long postId, CustomUserDetails customUserDetails) {
        Post post = postRepository.findByIdWithBusinessProfile(postId).orElseThrow(PostNotFoundException::new);
        return PostResponse.GetOne.build(post, customUserDetails);
    }

    @Transactional(readOnly = true)
    public List<PostResponse.GetPostStartTime> getPostStartTimeList(Long postId, LocalDate doDate) {
        List<PostDoDate> postDoDateList = postDoDateRepository.findAllByPostIdAndDoDate(postId, doDate);

        return postDoDateList.stream().map(PostResponse.GetPostStartTime::build).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Page<Post> getList(Long schoolId, LocalDate doDate, PageDto pageDto, Payment paymentType) {
        return postRepository.findAllBySchoolIdAndDoDate(schoolId, doDate, paymentType, pageDto.of());
    }

    @Transactional(readOnly = true)
    public Page<Post> getListByLike(User user, PageDto pageDto) {
        return postRepository.findAllByLike(user, pageDto.of());
    }

    public void deleteOne(Long postId, User user) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        permissionCheck(post.getBusinessProfile().getId(), user);
        postRepository.deleteById(postId);
    }

    private void permissionCheck(Long businessProfileId, User user) {
        if (!userBusinessProfileRepository.existsByUserIdAndBusinessProfileId(user.getId(), businessProfileId)) {
            throw new PermissionException();
        }
    }
}
