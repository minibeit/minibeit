package com.minibeit.user.service.integrate;

import com.minibeit.user.domain.User;
import com.minibeit.user.domain.UserVerificationCode;
import com.minibeit.user.domain.VerificationKinds;

public interface UserVerificationCodes {
    UserVerificationCode create(User user, VerificationKinds verificationKinds);
}
