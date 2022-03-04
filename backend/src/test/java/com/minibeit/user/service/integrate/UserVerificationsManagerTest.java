package com.minibeit.user.service.integrate;

import com.minibeit.user.domain.VerificationKinds;
import com.minibeit.user.domain.repository.UserVerificationCodeRepository;
import com.minibeit.user.service.mock.MockUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@DisplayName("UserVerificationsManager 단위 테스트")
@ExtendWith(MockitoExtension.class)
class UserVerificationsManagerTest {
    @Mock
    UserVerificationCodeRepository userVerificationCodeRepository;
    @InjectMocks
    UserVerificationsManager userVerificationsManager;

    @Test
    @DisplayName("메일 코드 생성 성공 - 저장")
    public void create() {
        given(userVerificationCodeRepository.findByUserIdAndVerificationKinds(any(), any())).willReturn(Optional.empty());

        userVerificationsManager.create(MockUser.MockUser1.USER, VerificationKinds.EMAIL);

        verify(userVerificationCodeRepository,times(1)).save(any());
    }

    @Test
    @DisplayName("메일 코드 재생성 성공 - 업데이트")
    public void update() {
        given(userVerificationCodeRepository.findByUserIdAndVerificationKinds(any(), any())).willReturn(Optional.of(MockUser.MockUser1.USER_VERIFICATION_CODE));

        userVerificationsManager.create(MockUser.MockUser1.USER, VerificationKinds.EMAIL);

        verify(userVerificationCodeRepository,times(0)).save(any());
    }
}