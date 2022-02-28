package com.minibeit.school.service.integrate;

import com.minibeit.school.domain.School;
import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.user.service.exception.SchoolNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
class SchoolManager implements Schools {
    private final SchoolRepository schoolRepository;

    @Override
    public School getOne(Long schoolId) {
        return schoolRepository.findById(schoolId).orElseThrow(SchoolNotFoundException::new);
    }
}
