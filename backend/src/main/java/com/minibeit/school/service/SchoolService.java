package com.minibeit.school.service;


import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.school.dto.SchoolResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class SchoolService {
    private final SchoolRepository schoolRepository;

    @Transactional(readOnly = true)
    public List<SchoolResponse.GetList> getList(String name) {
        return schoolRepository.findByNameStartsWith(name).stream().map(SchoolResponse.GetList::build).collect(Collectors.toList());
    }
}
