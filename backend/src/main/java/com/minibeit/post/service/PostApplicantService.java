package com.minibeit.post.service;

import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostApplicant;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.service.exception.DuplicateApplyException;
import com.minibeit.post.service.exception.PostDoDateNotFoundException;
import com.minibeit.post.service.exception.PostIsFullException;
import com.minibeit.post.service.exception.PostNotFoundException;
import com.minibeit.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PostApplicantService {
    private final PostRepository postRepository;
    private final PostDoDateRepository postDoDateRepository;
    private final PostApplicantRepository postApplicantRepository;

    public void apply(Long postId, PostRequest.Apply request, User user) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        PostDoDate postDoDate = postDoDateRepository.findByPostIdAndDoDate(postId, request.getDoDate()).orElseThrow(PostDoDateNotFoundException::new);
        List<PostApplicant> postApplicants = postApplicantRepository.findAllByPostDoDateIdAndStatusIsApprove(postDoDate.getId());
        if(postApplicantRepository.findByPostDoDateIdAndUserId(postDoDate.getId(),user.getId()).isPresent()){
            throw new DuplicateApplyException();
        }
        if(!post.applyPossible(postApplicants)){
            throw new PostIsFullException();
        }
        PostApplicant postApplicant = PostApplicant.create(postDoDate, user);
        postApplicantRepository.save(postApplicant);
    }

    public void applyCheck(Long postId, Long userId, PostRequest.ApplyCheck request) {
        //TODO 해당 게시물 비즈니스 프로필의 관리자인지 체크해야함
//        PostApplicant postApplicant = postApplicantRepository.findByPostIdAndUserId(postId, userId).orElseThrow(PostApplicantNotFoundException::new);
//        postApplicant.updateStatus(request.getApprove());
    }
}
