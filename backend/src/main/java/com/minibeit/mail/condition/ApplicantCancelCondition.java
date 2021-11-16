package com.minibeit.mail.condition;

import org.springframework.mail.SimpleMailMessage;

public class ApplicantCancelCondition implements MailCondition{

    @Override
    public SimpleMailMessage makeSimpleMessage(String toEmail, String fromEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setFrom(fromEmail);
        message.setSubject("피실험자 참가 취소 알림");
        message.setText("피실험자가 실험 참가를 취소되었습니다.");
        return message;
    }
}
