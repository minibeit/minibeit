package com.minibeit.businessprofile.service;

import com.minibeit.businessprofile.domain.BusinessReviewDetail;
import com.minibeit.businessprofile.domain.ReviewType;
import com.minibeit.businessprofile.domain.repository.BusinessReviewDetailRepository;
import com.minibeit.businessprofile.dto.BusinessReviewResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BusinessReviewService {
    private final BusinessReviewDetailRepository businessReviewDetailRepository;

    public List<BusinessReviewResponse.IdAndName> getList(ReviewType type) {
        List<BusinessReviewDetail> businessReviewDetailList = businessReviewDetailRepository.findAllByType(type);
        return businessReviewDetailList.stream().map(BusinessReviewResponse.IdAndName::build).collect(Collectors.toList());
    }
}
