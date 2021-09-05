package com.minibeit.post.service;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
import com.minibeit.common.dto.PageDto;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostApplicant;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.post.domain.PostFile;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.dto.PostResponse;
import com.minibeit.post.service.exception.PostApplicantNotFoundException;
import com.minibeit.post.service.exception.PostNotFoundException;
import com.minibeit.school.domain.School;
import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.user.domain.User;
import com.minibeit.user.service.exception.SchoolNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
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
    private final PostApplicantRepository postApplicantRepository;

    public PostResponse.OnlyId create(PostRequest.Create request, User user) {
        if (!userBusinessProfileRepository.existsByUserIdAndBusinessProfileId(user.getId(), request.getBusinessProfileId())) {
            throw new PermissionException();
        }

        School school = schoolRepository.findById(request.getSchoolId()).orElseThrow(SchoolNotFoundException::new);
        BusinessProfile businessProfile = businessProfileRepository.findById(request.getBusinessProfileId()).orElseThrow(BusinessProfileNotFoundException::new);
        List<PostFile> postFiles = postFileService.uploadFiles(request.getFiles());

        Post post = Post.create(request, school, businessProfile, postFiles);
        Post savedPost = postRepository.save(post);

        List<PostDoDate> postDoDateList = request.getDoDateList().stream().map(date -> PostDoDate.create(date, savedPost)).collect(Collectors.toList());
        postDoDateRepository.saveAll(postDoDateList);

        return PostResponse.OnlyId.build(savedPost);
    }

    @Transactional(readOnly = true)
    public PostResponse.GetOne getOne(Long postId, User user) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        return PostResponse.GetOne.build(post, user);
    }

    public void deleteOne(Long postId, User user) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        post.checkPermission(user);
        postRepository.deleteById(postId);
    }

    public void apply(Long postId, PostRequest.Apply request, User user) {
        //TODO 게시물에 실험 시작 날짜에 request로 온 날짜가 포함되는지 확인 필요
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        PostApplicant postApplicant = PostApplicant.create(post, request, user);
        postApplicantRepository.save(postApplicant);
    }

    public void applyCheck(Long postId, Long userId, PostRequest.ApplyCheck request) {
        //TODO 해당 게시물 비즈니스 프로필의 관리자인지 체크해야함
        PostApplicant postApplicant = postApplicantRepository.findByPostIdAndUserId(postId, userId).orElseThrow(PostApplicantNotFoundException::new);
        postApplicant.updateStatus(request.getApprove());
    }

    @Transactional(readOnly = true)
    public Page<Post> getList(Long schoolId, LocalDate doDate, PageDto pageDto) {
      return postRepository.findAllBySchoolIdAndDoDate(schoolId, doDate, pageDto.of());
    }
}
