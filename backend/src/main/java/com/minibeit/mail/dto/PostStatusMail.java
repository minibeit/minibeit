package com.minibeit.mail.dto;

import com.minibeit.mail.condition.*;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PostStatusMail {
    private MailCondition mailCondition;
    private String address;

    public static PostStatusMail create(PostMailCondition postMailCondition, String address) {
        PostStatusMailBuilder postStatusMailBuilder = PostStatusMail.builder().address(address);
        switch (postMailCondition) {
            case APPROVE:
                return postStatusMailBuilder.mailCondition(new ApproveCondition()).build();
            case REJECT:
                return postStatusMailBuilder.mailCondition(new RejectCondition()).build();
            case APPROVECANCEL:
                return postStatusMailBuilder.mailCondition(new ApproveCancelCondition()).build();
            case APPLICANTCANCEL:
                return postStatusMailBuilder.mailCondition(new ApplicantCancelCondition()).build();
        }
        throw new IllegalArgumentException("해당 메일 조건이 없습니다.");
    }
}
