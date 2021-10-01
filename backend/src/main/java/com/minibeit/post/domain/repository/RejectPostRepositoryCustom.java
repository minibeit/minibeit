package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.RejectPost;
import com.minibeit.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RejectPostRepositoryCustom {
    Page<RejectPost> getListByUser(User user, Pageable pageable);
}
