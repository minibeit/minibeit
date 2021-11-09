package com.minibeit.mail.dto;

import com.minibeit.mail.condition.PostMailCondition;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PostStatusMailRequest {
    private PostMailCondition postMailCondition;
    private String toEmail;
}
