package com.minibeit.post.service.unit.mock;

import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostDoDate;

import java.time.LocalDateTime;

public class MockPostDoDate {
    public static class MockPostDoDate1 {
        public static final Long ID = 1L;
        public static final LocalDateTime DO_DATE = LocalDateTime.of(2022, 2, 13, 9, 0);
        public static final Post POST = MockPost.MockPost1.POST;
        public static final boolean IS_FULL = false;
        public static final boolean DEL = false;

        public static final PostDoDate POST_DO_DATE = PostDoDate.builder()
                .id(ID)
                .doDate(DO_DATE)
                .isFull(IS_FULL)
                .post(POST)
                .del(DEL)
                .build();
    }
}
