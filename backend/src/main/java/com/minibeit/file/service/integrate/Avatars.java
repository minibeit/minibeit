package com.minibeit.file.service.integrate;

import com.minibeit.file.domain.Avatar;
import com.minibeit.user.domain.User;
import org.springframework.web.multipart.MultipartFile;

public interface Avatars {

    Avatar upload(MultipartFile file);

    void updateUserAvatar(Boolean avatarChanged, MultipartFile updatedAvatar, User findUser);

    void updateBusinessAvatar();

    void deleteOne(Avatar file);
}
