package com.minibeit.school.service.unit;

import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.school.service.SchoolService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static com.minibeit.school.service.unit.MockSchool.School1.NAME;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@DisplayName("School Service 단위 테스트")
@ExtendWith(MockitoExtension.class)
public class SchoolServiceUniTest {
    @Mock
    SchoolRepository schoolRepository;

    @InjectMocks
    SchoolService schoolService;

    @Test
    @DisplayName("해당 글자로 시작하는 학교 목록 조회 성공공")
    public void getList() {
        given(schoolRepository.findByNameStartsWith(any())).willReturn(anyList());
        schoolService.getList(NAME);

        verify(schoolRepository).findByNameStartsWith(any());
    }
}
