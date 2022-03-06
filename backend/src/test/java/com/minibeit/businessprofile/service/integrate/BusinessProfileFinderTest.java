package com.minibeit.businessprofile.service.integrate;

import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static com.minibeit.businessprofile.service.mock.MockBusinessProfile.BusinessProfile1;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@DisplayName("BusinessProfileFinder 단위 테스트")
@ExtendWith(MockitoExtension.class)
class BusinessProfileFinderTest {
    @Mock
    BusinessProfileRepository businessProfileRepository;
    @InjectMocks
    BusinessProfileFinder businessProfileFinder;

    @Test
    @DisplayName("비즈니스프로필 식별자로 조회 성공")
    public void getOne() {
        given(businessProfileRepository.findById(any())).willReturn(Optional.of(BusinessProfile1.BUSINESS_PROFILE));

        businessProfileFinder.getOne(BusinessProfile1.ID);

        verify(businessProfileRepository).findById(any());
    }

    @Test
    @DisplayName("유저 식별자로 조회 실패 - 해당 유저가 없는 경우")
    public void getOneNotFoundUser() {
        given(businessProfileRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(BusinessProfileNotFoundException.class, () -> businessProfileFinder.getOne(BusinessProfile1.ID));
    }
}