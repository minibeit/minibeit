package com.minibeit.post.service;

import com.minibeit.auth.domain.CustomUserDetails;
import com.minibeit.common.dto.PageDto;
import com.minibeit.post.domain.*;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostLikeRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.service.dto.PostResponse;
import com.minibeit.post.service.exception.PostNotFoundException;
import com.minibeit.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final PostDoDateRepository postDoDateRepository;
    private final PostLikeRepository postLikeRepository;

    @Transactional
    public void createOrDeletePostLike(Long postId, User user) {
        Optional<PostLike> findPostLike = postLikeRepository.findByPostIdAndUserId(postId, user.getId());
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        if (findPostLike.isEmpty()) {
            PostLike postLike = PostLike.create(post, user);
            postLikeRepository.save(postLike);
        } else {
            postLikeRepository.delete(findPostLike.get());
        }
    }

    public PostResponse.GetOne getOne(Long postId, CustomUserDetails customUserDetails) {
        Post post = postRepository.findGetOneByPostId(postId).orElseThrow(PostNotFoundException::new);
        return PostResponse.GetOne.build(post, customUserDetails);
    }

    public List<PostResponse.GetPostStartTime> getPostStartTimeList(Long postId, LocalDate doDate) {
        List<PostDoDate> postDoDateList = postDoDateRepository.findAllByPostIdAndDoDate(postId, doDate);
        return postDoDateList.stream().map(postDoDate -> PostResponse.GetPostStartTime.build(postDoDate, postDoDate.getPost())).collect(Collectors.toList());
    }

    public PostResponse.DoDateList getDoDateListByYearMonth(Long postId, YearMonth yearMonth) {
        List<PostDoDate> postDoDateList = postDoDateRepository.findAllByPostIdAndYearMonth(postId, yearMonth);
        return PostResponse.DoDateList.build(postDoDateList);
    }

    public Page<PostResponse.GetList> getList(Long schoolId, LocalDate doDate, String category, PageDto pageDto, Payment paymentType, LocalTime startTime, LocalTime endTime, Integer minPay, Integer doTime, CustomUserDetails customUserDetails) {
        Page<Post> posts = postRepository.findAllBySchoolIdAndDoDate(schoolId, doDate, paymentType, category, startTime, endTime, minPay, doTime, pageDto.of());
        return posts.map(post -> PostResponse.GetList.build(post, customUserDetails));
    }

    public Page<PostResponse.GetLikeList> getListByLike(User user, PageDto pageDto) {
        Page<Post> posts = postRepository.findAllByLike(user, pageDto.of());
        return posts.map(PostResponse.GetLikeList::build);
    }

    public PostResponse.GetMyCount getMyPostStatus(ApplyStatus status, LocalDateTime now, User user) {
        return postRepository.countMyPostStatusByApplyStatus(status, now, user);
    }

    public Page<PostResponse.GetMyApplyList> getListByApplyStatus(ApplyStatus status, User user, LocalDateTime now, PageDto pageDto) {
        return postRepository.findAllByApplyStatus(status, user, now, pageDto.of());
    }

    @Transactional
    public void deleteLikeOfCompletedPost(User user) {
        List<PostLike> completedPostLike = postLikeRepository.findAllByUserIdWithCompletedPost(user.getId());

        postLikeRepository.deleteAll(completedPostLike);
    }
}
