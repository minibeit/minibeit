package com.minibeit.interests.dto;

import com.minibeit.interests.domain.Interests;
import lombok.*;

public class InterestsResponse {
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class IdAndName {
        private Long id;
        private String name;

        public static InterestsResponse.IdAndName build(Interests interests) {
            return IdAndName.builder()
                    .id(interests.getId())
                    .name(interests.getName())
                    .build();
        }
    }
}
