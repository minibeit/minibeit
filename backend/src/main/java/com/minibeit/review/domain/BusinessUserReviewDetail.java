package com.minibeit.review.domain;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "business_user_review_detail")
public class BusinessUserReviewDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @Enumerated(EnumType.STRING)
    private BusinessUserReviewType type;

    @Enumerated(EnumType.STRING)
    private BusinessUserReviewEvalType evalType;

    @Builder.Default
    @OneToMany(mappedBy = "businessUserReviewDetail")
    private List<BusinessUserReview> businessUserReviewList = new ArrayList<>();
}
