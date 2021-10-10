package com.minibeit.user.service.exception;

import com.minibeit.common.exception.InvalidValueException;

public class UserHaveBusinessProfile extends InvalidValueException {

    public UserHaveBusinessProfile() {
        super("회원탈퇴전 비즈니스 프로필을 모두 삭제하거나 관리자를 양도해야합니다.");
    }
}
