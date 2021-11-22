//package com.minibeit.mail.condition;
//
//import org.springframework.mail.SimpleMailMessage;
//
//public class ApproveCancelPostCondition implements MailPostCondition {
//    @Override
//    public SimpleMailMessage makeMimeMessage(String toEmail, String fromEmail) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(toEmail);
//        message.setFrom(fromEmail);
//        message.setSubject("모집 확정 취소 알림");
//        message.setText("확정된 게시물에 확정이 취소되었습니다.");
//        return message;
//    }
//}
