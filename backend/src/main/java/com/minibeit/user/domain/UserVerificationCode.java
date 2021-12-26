package com.minibeit.user.domain;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.common.exception.InvalidValueException;
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

    public void update(UserVerificationCode userVerificationCode) {
        this.code = userVerificationCode.getCode();
        this.expirationDate = userVerificationCode.getExpirationDate();
    }

    public void validate(String code) {
        if(code.equals(this.code) && this.expirationDate.isAfter(LocalDateTime.now())){
            throw new InvalidValueException("잘못된 코드입니다.");
        }
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
