package com.minibeit.user.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "user_refresh_token")
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    private LocalDateTime expiryDate;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public void update(String token, LocalDateTime expiryDate) {
        this.token = token;
        this.expiryDate = expiryDate;
    }

    public boolean isSame(String refreshToken) {
        return this.token.equals(refreshToken);
    }

    public static RefreshToken create(String token, LocalDateTime expiredAt, User user) {
        return RefreshToken.builder().token(token).expiryDate(expiredAt).user(user).build();
    }
}
