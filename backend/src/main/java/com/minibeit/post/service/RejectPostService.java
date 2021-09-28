package com.minibeit.post.service;

import com.minibeit.post.domain.repository.RejectPostRepository;
import com.minibeit.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RejectPostService {
    private final RejectPostRepository rejectPostRepository;


    public void deleteOne(Long rejectPostId, User user) {
        rejectPostRepository.deleteByIdAndUserId(rejectPostId, user.getId());
    }
}
