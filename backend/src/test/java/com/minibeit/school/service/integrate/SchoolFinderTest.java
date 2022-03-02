package com.minibeit.school.service.integrate;

import com.minibeit.school.domain.repository.SchoolRepository;
import com.minibeit.user.service.exception.SchoolNotFoundException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static com.minibeit.school.service.mock.MockSchool.School1;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@DisplayName("SchoolFinder 단위 테스트")
@ExtendWith(MockitoExtension.class)
class SchoolFinderTest {
    @Mock
    SchoolRepository schoolRepository;
    @InjectMocks
    SchoolFinder schoolFinder;

    @Test
    @DisplayName("학교 식별자로 조회 성공")
    public void getOne() {
        given(schoolRepository.findById(any())).willReturn(Optional.of(School1.SCHOOL));

        schoolFinder.getOne(School1.ID);

        verify(schoolRepository).findById(any());
    }

    @Test
    @DisplayName("학교 식별자로 조회 성공 실패 - 해당 학교가 없는 경우")
    public void getOneNotFoundSchool() {
        given(schoolRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(SchoolNotFoundException.class, () -> schoolFinder.getOne(School1.ID));
    }
}