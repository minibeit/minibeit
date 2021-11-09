package com.minibeit.mail.condition;

import org.springframework.mail.SimpleMailMessage;

public class ApproveCondition implements MailCondition {
    @Override
    public SimpleMailMessage makeSimpleMessage(String toEmail, String fromEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setFrom(fromEmail);
        message.setSubject("모집 확정 알림");
        message.setText("지원하신 게시물에 참여 확정 되었습니다.");
        return message;
    }
}
