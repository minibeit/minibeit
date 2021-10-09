package com.minibeit.businessprofile.service;

import com.minibeit.businessprofile.domain.BusinessProfileReview;
import com.minibeit.businessprofile.domain.repository.BusinessProfileReviewRepository;
import com.minibeit.businessprofile.dto.BusinessProfileReviewResponse;
import com.minibeit.businessprofile.dto.BusinessProfilesReviewRequest;
import com.minibeit.businessprofile.service.exception.BusinessProfileReviewNotFoundException;
import com.minibeit.common.dto.PageDto;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostApplicant;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.service.exception.PostApplicantNotFoundException;
import com.minibeit.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BusinessProfileReviewService {
    private final PostApplicantRepository postApplicantRepository;
    private final BusinessProfileReviewRepository businessProfileReviewRepository;

    public BusinessProfileReviewResponse.ReviewId create(Long postDoDateId, BusinessProfilesReviewRequest.Create request, LocalDateTime now, User user) {
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(postDoDateId, user.getId()).orElseThrow(PostApplicantNotFoundException::new);
        PostDoDate postDoDate = postApplicant.getPostDoDate();
        Post post = postDoDate.getPost();
        if (!postApplicant.writeReviewIsPossible(now)) {
            throw new PermissionException();
        }
        postApplicant.updateWriteReview();

        BusinessProfileReview businessProfileReview = BusinessProfileReview.create(postApplicant.getPostDoDate(), post.getBusinessProfile(), request);
        BusinessProfileReview savedReview = businessProfileReviewRepository.save(businessProfileReview);
        return BusinessProfileReviewResponse.ReviewId.build(savedReview);
    }

    @Transactional(readOnly = true)
    public BusinessProfileReviewResponse.GetOne getOne(Long businessProfileReviewId) {
        BusinessProfileReview businessProfileReview = businessProfileReviewRepository.findByIdWithUser(businessProfileReviewId).orElseThrow(BusinessProfileReviewNotFoundException::new);
        return BusinessProfileReviewResponse.GetOne.build(businessProfileReview);
    }

    @Transactional(readOnly = true)
    public Page<BusinessProfileReviewResponse.GetOne> getList(Long businessProfileId, PageDto pageDto) {
        Page<BusinessProfileReview> businessProfileReviewList = businessProfileReviewRepository.findAllByBusinessProfileId(businessProfileId, pageDto.of());
        List<BusinessProfileReviewResponse.GetOne> getOneList = businessProfileReviewList.stream().map(BusinessProfileReviewResponse.GetOne::build).collect(Collectors.toList());

        return new PageImpl<>(getOneList, pageDto.of(), businessProfileReviewList.getTotalElements());
    }

    public BusinessProfileReviewResponse.ReviewId update(Long businessProfileReviewId, BusinessProfilesReviewRequest.Update request, LocalDateTime now, User user) {
        BusinessProfileReview businessProfileReview = businessProfileReviewRepository.findById(businessProfileReviewId).orElseThrow(BusinessProfileReviewNotFoundException::new);
        permissionCheck(user, businessProfileReview);
        if (!businessProfileReview.updateReviewIsPossible(now)) {
            throw new PermissionException();
        }
        businessProfileReview.update(request.getContent());
        return BusinessProfileReviewResponse.ReviewId.build(businessProfileReview);
    }

    public void deleteOne(Long businessProfileReviewId, User user) {
        BusinessProfileReview businessProfileReview = businessProfileReviewRepository.findById(businessProfileReviewId).orElseThrow(BusinessProfileReviewNotFoundException::new);
        permissionCheck(user, businessProfileReview);
        businessProfileReviewRepository.delete(businessProfileReview);
    }

    private void permissionCheck(User user, BusinessProfileReview businessProfileReview) {
        if (!businessProfileReview.getCreatedBy().getId().equals(user.getId())) {
            throw new PermissionException();
        }
    }
}
