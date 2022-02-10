package com.minibeit.mail.domain;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MailFactory {
    private MailStrategy mail;
    private String address;

    public static MailFactory create(MailCondition mailCondition, String address) {
        MailFactoryBuilder builder = MailFactory.builder().address(address);
        switch (mailCondition) {
            case APPROVE:
                return builder.mail(new ApprovePostMail()).build();
            case REJECT:
                return builder.mail(new RejectPostMail()).build();
            case APPROVECANCEL:
                return builder.mail(new ApproveCancelMail()).build();
            case APPLICANTCANCEL:
                return builder.mail(new ApplicantCancelMail()).build();
            case VERIFICATION:
                return builder.mail(new EmailVerificationMail()).build();
        }
        throw new IllegalArgumentException("해당 메일 조건이 없습니다.");
    }
}
