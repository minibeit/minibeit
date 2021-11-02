package com.minibeit.post.service;

import com.minibeit.common.dto.PageDto;
import com.minibeit.post.domain.PostApplicant;
import com.minibeit.post.domain.RejectPost;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.RejectPostRepository;
import com.minibeit.post.dto.RejectPostResponse;
import com.minibeit.user.domain.AlarmStatus;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.service.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RejectPostService {
    private final RejectPostRepository rejectPostRepository;
    private final UserRepository userRepository;

    public Page<RejectPostResponse.GetList> getList(PageDto pageDto, User user) {
        Page<RejectPost> rejectPostList = rejectPostRepository.findAllByUserId(user.getId(), pageDto.ofWithSortDesc("id"));
        User currentUser = userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::new);
        if(currentUser.getAlarm() != null){
            currentUser.getAlarm().alarmOff(AlarmStatus.REJECT);
        }
        return rejectPostList.map(RejectPostResponse.GetList::build);
    }

    public void deleteOne(Long rejectPostId, User user) {
        rejectPostRepository.deleteByIdAndUserId(rejectPostId, user.getId());
    }
}
