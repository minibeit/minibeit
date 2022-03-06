package com.minibeit.user.service.integrate;

import com.minibeit.user.domain.User;

public interface Users {
    User getOneWithWithUserBusinessProfileAndBusiness(Long userId);

    User getOne(Long userId);
}
