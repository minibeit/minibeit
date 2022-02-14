package com.minibeit.school.service.unit;

import com.minibeit.school.domain.School;

public class MockSchool {
    public static class School1 {
        public static final Long ID = 1L;
        public static final String NAME = "고려대학교";

        public static final School SCHOOL = School.builder()
                .id(ID)
                .name(NAME)
                .build();
    }
}
