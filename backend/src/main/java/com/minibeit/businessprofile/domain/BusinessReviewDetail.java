package com.minibeit.businessprofile.domain;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "business_review_detail")
public class BusinessReviewDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @Enumerated(EnumType.STRING)
    private ReviewType type;

    @Builder.Default
    @OneToMany(mappedBy = "businessReviewDetail")
    private List<BusinessReview> businessReviewList = new ArrayList<>();
}
