package com.minibeit.file.service.integrate;

import com.minibeit.file.domain.Avatar;
import org.springframework.web.multipart.MultipartFile;

public interface Avatars {
    Avatar upload(MultipartFile file);

    Avatar update(Boolean avatarChanged, MultipartFile updatedAvatar, Avatar avatar);

    void deleteOne(Avatar file);
}
