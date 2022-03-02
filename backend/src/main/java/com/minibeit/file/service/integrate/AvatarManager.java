package com.minibeit.file.service.integrate;

import com.minibeit.file.domain.Avatar;
import com.minibeit.file.domain.S3Uploader;
import com.minibeit.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
class AvatarManager implements Avatars{
    private final S3Uploader s3Uploader;

    @Override
    public Avatar upload(MultipartFile file) {
        if (file == null) {
            return null;
        }
        return Avatar.create(s3Uploader.upload(file).toAvatar());
    }

    @Override
    public void updateUserAvatar(Boolean avatarChanged, MultipartFile updatedAvatar, User findUser) {
        if (avatarChanged) {
            deleteOne(findUser.getAvatar());
            Avatar avatar = upload(updatedAvatar);
            findUser.updateAvatar(avatar);
        }
    }

    @Override
    public void updateBusinessAvatar() {

    }

    @Override
    public void deleteOne(Avatar file) {
        if (file != null) {
            s3Uploader.delete(file.getName());
        }
    }
}
