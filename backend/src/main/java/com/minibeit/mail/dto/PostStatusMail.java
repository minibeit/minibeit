package com.minibeit.mail.dto;

import com.minibeit.mail.condition.*;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PostStatusMail {
    private MailPostCondition mailCondition;
    private String address;

    public static PostStatusMail create(PostMailCondition postMailCondition, String address) {
        PostStatusMailBuilder postStatusMailBuilder = PostStatusMail.builder().address(address);
        switch (postMailCondition) {
            case APPROVE:
                return postStatusMailBuilder.mailCondition(new ApprovePostCondition()).build();
            case REJECT:
                return postStatusMailBuilder.mailCondition(new RejectPostCondition()).build();
//            case APPROVECANCEL:
//                return postStatusMailBuilder.mailCondition(new ApproveCancelPostCondition()).build();
            case APPLICANTCANCEL:
                return postStatusMailBuilder.mailCondition(new ApplicantCancelPostCondition()).build();
        }
        throw new IllegalArgumentException("해당 메일 조건이 없습니다.");
    }
}
