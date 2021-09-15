package com.minibeit.interests.service;

import com.minibeit.interests.domain.Interests;
import com.minibeit.interests.domain.InterestsRepository;
import com.minibeit.interests.dto.InterestsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InterestsService {
    private final InterestsRepository interestsRepository;

    public List<InterestsResponse.IdAndName> getList() {
        List<Interests> interests = interestsRepository.findAll();
        return interests.stream().map(InterestsResponse.IdAndName::build).collect(Collectors.toList());
    }
}
