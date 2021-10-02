package com.minibeit.post.service;

import com.minibeit.common.dto.PageDto;
import com.minibeit.post.domain.RejectPost;
import com.minibeit.post.domain.repository.RejectPostRepository;
import com.minibeit.post.dto.RejectPostResponse;
import com.minibeit.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RejectPostService {
    private final RejectPostRepository rejectPostRepository;

    @Transactional(readOnly = true)
    public Page<RejectPostResponse.GetList> getList(PageDto pageDto, User user) {
        Page<RejectPost> rejectPostList = rejectPostRepository.getListByUser(user, pageDto.of());
        return rejectPostList.map(RejectPostResponse.GetList::build);
    }

    public void deleteOne(Long rejectPostId, User user) {
        rejectPostRepository.deleteByIdAndUserId(rejectPostId, user.getId());
    }
}
