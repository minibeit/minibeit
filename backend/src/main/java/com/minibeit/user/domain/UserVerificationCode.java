package com.minibeit.user.domain;

import com.minibeit.common.domain.BaseEntity;
import lombok.*;
import org.springframework.mail.SimpleMailMessage;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Random;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "user_verification_code")
public class UserVerificationCode extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;

    private LocalDateTime expirationDate;

    @Enumerated(EnumType.STRING)
    private VerificationKinds verificationKinds;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public SimpleMailMessage makeMessage(String toEmail, String fromEmail, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setFrom(fromEmail);
        message.setSubject("이메일 인증번호를 확인해주세요.");
        message.setText("이메일 인증번호 : " + code);

        return message;
    }

    public void update(UserVerificationCode userVerificationCode) {
        this.code = userVerificationCode.getCode();
        this.expirationDate = userVerificationCode.getExpirationDate();
    }

    public boolean validate(String code) {
        return code.equals(this.code) && this.expirationDate.isAfter(LocalDateTime.now());
    }

    public static UserVerificationCode create(User user, VerificationKinds verificationKinds) {
        String code = createCode();

        return UserVerificationCode.builder()
                .code(code)
                .verificationKinds(verificationKinds)
                .user(user)
                .expirationDate(LocalDateTime.now().plusMinutes(5))
                .build();
    }

    private static String createCode() {
        StringBuilder code = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 6; i++) {
            code.append((random.nextInt(10)));
        }
        return code.toString();
    }
}
