package com.minibeit.post.service;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
import com.minibeit.common.dto.PageDto;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.*;
import com.minibeit.post.domain.repository.*;
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
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
    private static final String REJECT_MSG = "모집이 완료되었습니다.";
    private final PostRepository postRepository;
    private final SchoolRepository schoolRepository;
    private final PostFileService postFileService;
    private final BusinessProfileRepository businessProfileRepository;
    private final UserBusinessProfileRepository userBusinessProfileRepository;
    private final PostDoDateRepository postDoDateRepository;
    private final PostLikeRepository postLikeRepository;
    private final PostApplicantRepository postApplicantRepository;
    private final RejectPostRepository rejectPostRepository;

    public PostResponse.OnlyId createInfo(PostRequest.CreateInfo request, User user) {
        permissionCheck(request.getBusinessProfileId(), user);

        School school = schoolRepository.findById(request.getSchoolId()).orElseThrow(SchoolNotFoundException::new);
        BusinessProfile businessProfile = businessProfileRepository.findById(request.getBusinessProfileId()).orElseThrow(BusinessProfileNotFoundException::new);

        Post post = Post.create(request, school, businessProfile);
        Post savedPost = postRepository.save(post);

        List<PostDoDate> postDoDateList = request.getDoDateList().stream().map(doDate -> PostDoDate.create(doDate.getGroupId(), doDate.getDoDate(), post)).collect(Collectors.toList());
        postDoDateRepository.saveAll(postDoDateList);

        return PostResponse.OnlyId.build(savedPost);
    }

    public PostResponse.OnlyId addFiles(Long postId, PostRequest.AddFile request, User user) {
        Post post = postRepository.findByIdWithBusinessProfile(postId).orElseThrow(PostNotFoundException::new);
        permissionCheck(post.getBusinessProfile().getId(), user);
        postFileService.uploadFiles(post, request.getFiles());

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

    public void recruitmentCompleted(Long postId, User user) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        permissionCheck(post.getBusinessProfile().getId(), user);
        List<PostApplicant> postApplicantList = postApplicantRepository.findAllByApplyStatusIsWait(postId);

        List<Long> applicantIdList = postApplicantList.stream().map(PostApplicant::getId).collect(Collectors.toList());
        postApplicantRepository.updateReject(applicantIdList, ApplyStatus.REJECT);

        List<RejectPost> rejectPostList = postApplicantList.stream()
                .map(postApplicant -> RejectPost.create(post.getTitle(), post.getPlace(), post.getContact(), post.getDoTime(), postApplicant.getPostDoDate().getDoDate(), REJECT_MSG, postApplicant.getUser())).collect(Collectors.toList());
        rejectPostRepository.saveAll(rejectPostList);

        post.completed();
    }

    @Transactional(readOnly = true)
    public PostResponse.GetOne getOne(Long postId, CustomUserDetails customUserDetails) {
        Post post = postRepository.findByIdWithBusinessProfile(postId).orElseThrow(PostNotFoundException::new);
        return PostResponse.GetOne.build(post, customUserDetails);
    }

    @Transactional(readOnly = true)
    public List<PostResponse.GetPostStartTime> getPostStartTimeList(Long postId, LocalDate doDate) {
        List<PostDoDate> postDoDateList = postDoDateRepository.findAllByPostIdAndDoDate(postId, doDate);

        return postDoDateList.stream().map(postDoDate -> PostResponse.GetPostStartTime.build(postDoDate, postDoDate.getPost())).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Page<PostResponse.GetList> getList(Long schoolId, LocalDate doDate, String category, PageDto pageDto, Payment paymentType, LocalTime startTime, LocalTime endTime, Integer minPay, Integer doTime, CustomUserDetails customUserDetails) {
        Page<Post> posts = postRepository.findAllBySchoolIdAndDoDate(schoolId, doDate, paymentType, category, startTime, endTime, minPay, doTime, pageDto.of());
        return posts.map(post -> PostResponse.GetList.build(post,customUserDetails));
    }

    @Transactional(readOnly = true)
    public Page<PostResponse.GetLikeList> getListByLike(User user, PageDto pageDto) {
        final Page<Post> posts = postRepository.findAllByLike(user, pageDto.of());
        return posts.map(PostResponse.GetLikeList::build);
    }

    @Transactional(readOnly = true)
    public Page<PostResponse.GetMyCompletedList> getListByMyCompleteList(User user, PageDto pageDto) {
        return postRepository.findAllByMyCompleted(user, pageDto.of());
    }

    @Transactional(readOnly = true)
    public Page<PostResponse.GetMyApplyList> getListByApplyStatus(ApplyStatus applyStatus, User user, PageDto pageDto) {
        return postRepository.findAllByApplyStatus(applyStatus, user, pageDto.of());
    }

    @Transactional(readOnly = true)
    public Page<PostResponse.GetListByBusinessProfile> getListByBusinessProfile(Long businessProfileId, PostStatus postStatus, PageDto pageDto) {
        Page<Post> posts = postRepository.findAllByBusinessProfileId(businessProfileId, postStatus, pageDto.of());
        return posts.map(PostResponse.GetListByBusinessProfile::build);
    }

    public PostResponse.OnlyId updateContent(Long postId, PostRequest.UpdateContent request, User user) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        permissionCheck(post.getBusinessProfile().getId(), user);
        Post updatedPost = post.updateContent(request.getUpdatedContent());

        return PostResponse.OnlyId.build(updatedPost);
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
