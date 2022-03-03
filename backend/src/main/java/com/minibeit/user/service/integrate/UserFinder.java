package com.minibeit.user.service.integrate;

import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.service.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
class UserFinder implements Users{
    private final UserRepository userRepository;

    @Override
    public User getOneWithWithUserBusinessProfileAndBusiness(Long userId) {
        return userRepository.findByIdWithUserBusinessProfileAndBusiness(userId).orElseThrow(UserNotFoundException::new);
    }

    @Override
    public User getOne(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }


}
