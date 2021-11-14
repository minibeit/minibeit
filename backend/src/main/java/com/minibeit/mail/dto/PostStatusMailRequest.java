package com.minibeit.mail.dto;

import com.minibeit.mail.condition.PostMailCondition;
import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PostStatusMailRequest {
    private PostMailCondition postMailCondition;
    private List<String> toEmail;
}
