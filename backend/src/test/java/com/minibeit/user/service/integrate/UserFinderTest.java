package com.minibeit.user.service.integrate;

import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.service.exception.UserNotFoundException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static com.minibeit.user.service.mock.MockUser.MockUser1;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@DisplayName("UserFinderTest 단위 테스트")
@ExtendWith(MockitoExtension.class)
class UserFinderTest {
    @Mock
    UserRepository userRepository;
    @InjectMocks
    UserFinder userFinder;

    @Test
    @DisplayName("비즈니스와 유저비즈니스를 같이 조회 성공")
    public void getOneWithWithUserBusinessProfileAndBusiness() {
        given(userRepository.findByIdWithUserBusinessProfileAndBusiness(any())).willReturn(Optional.of(MockUser1.USER));

        userFinder.getOneWithWithUserBusinessProfileAndBusiness(MockUser1.ID);

        verify(userRepository).findByIdWithUserBusinessProfileAndBusiness(any());
    }

    @Test
    @DisplayName("비즈니스와 유저비즈니스를 같이 조회 실패 - 해당 유저가 없는 경우")
    public void getOneWithWithUserBusinessProfileAndBusinessNotFoundUser() {
        given(userRepository.findByIdWithUserBusinessProfileAndBusiness(any())).willReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userFinder.getOneWithWithUserBusinessProfileAndBusiness(MockUser1.ID));
    }

    @Test
    @DisplayName("유저 식별자로 조회 성공")
    public void getOne() {
        given(userRepository.findById(any())).willReturn(Optional.of(MockUser1.USER));

        userFinder.getOne(MockUser1.ID);

        verify(userRepository).findById(any());
    }

    @Test
    @DisplayName("유저 식별자로 조회 실패 - 해당 유저가 없는 경우")
    public void getOneNotFoundUser() {
        given(userRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userFinder.getOne(MockUser1.ID));
    }
}