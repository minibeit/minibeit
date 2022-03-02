package com.minibeit.school.service;


import com.minibeit.school.domain.repository.SchoolRepository;
import com.minibeit.school.service.dto.SchoolResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SchoolService {
    private final SchoolRepository schoolRepository;

    @Transactional(readOnly = true)
    public List<SchoolResponse.GetList> getList(String name) {
        return schoolRepository.findByNameStartsWith(name).stream().map(SchoolResponse.GetList::build).collect(Collectors.toList());
    }
}
