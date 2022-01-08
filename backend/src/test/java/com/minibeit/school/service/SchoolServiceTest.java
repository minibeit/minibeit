package com.minibeit.school.service;

import com.minibeit.ServiceIntegrationTest;
import com.minibeit.school.domain.School;
import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.school.dto.SchoolResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("학교 조회 테스트")
class SchoolServiceTest extends ServiceIntegrationTest {

    @Autowired
    private SchoolRepository schoolRepository;
    @Autowired
    private SchoolService schoolService;

    private School kSchool, kSchool2;

    @BeforeEach
    void set() {
        initSchool();
    }

    private void initSchool() {
        School school1 = School.builder().name("고려대").build();
        kSchool = schoolRepository.save(school1);

        School school2 = School.builder().name("고구려대").build();
        kSchool2 = schoolRepository.save(school2);

    }

    @Test
    @DisplayName("학교 리스트 조회 - 성공")
    void getList() {

        //'고'로 시작하는 학교
        List<SchoolResponse.GetList> kSchoolList = schoolService.getList("고");
        assertThat(kSchoolList.get(0).getName()).isEqualTo(kSchool2.getName());
        assertThat(kSchoolList.get(1).getName()).isEqualTo(kSchool.getName());

        //고려대 조회
        List<SchoolResponse.GetList> kSchoolOne = schoolService.getList("고려대");
        assertThat(kSchoolOne.get(0).getName()).isEqualTo(kSchool.getName());

        //없는 학교 조회
        List<SchoolResponse.GetList> emptyList = schoolService.getList("홍익대");
        assertThat(emptyList.size()).isEqualTo(0);
    }

}