package com.minibeit.post.service;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
import com.minibeit.common.dto.PageDto;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.post.domain.PostFile;
import com.minibeit.post.domain.PostLike;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostLikeRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.dto.PostResponse;
import com.minibeit.post.service.exception.PostNotFoundException;
import com.minibeit.school.domain.School;
import com.minibeit.school.domain.SchoolRepository;
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

    @Transactional(readOnly = true)
    public PostResponse.GetOne getOne(Long postId, User user) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        return PostResponse.GetOne.build(post, user);
    }

    public void deleteOne(Long postId, User user) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        permissionCheck(post.getBusinessProfile().getId(), user);
        postRepository.deleteById(postId);
    }

    @Transactional(readOnly = true)
    public Page<Post> getList(Long schoolId, LocalDate doDate, PageDto pageDto) {
        return postRepository.findAllBySchoolIdAndDoDate(schoolId, doDate, pageDto.of());
    }

    private void permissionCheck(Long businessProfileId, User user) {
        if (!userBusinessProfileRepository.existsByUserIdAndBusinessProfileId(user.getId(), businessProfileId)) {
            throw new PermissionException();
        }
    }
}
