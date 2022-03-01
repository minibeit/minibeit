package com.minibeit.user.service;

import com.minibeit.file.domain.S3Uploader;
import com.minibeit.user.domain.Avatar;
import com.minibeit.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class AvatarService {
    private final S3Uploader s3Uploader;

    public Avatar upload(MultipartFile file) {
        if (file == null) {
            return null;
        }
        return Avatar.create(s3Uploader.upload(file).toAvatar());
    }

    public void update(Boolean avatarChanged, MultipartFile updatedAvatar, User findUser) {
        if (avatarChanged) {
            deleteOne(findUser.getAvatar());
            Avatar avatar = upload(updatedAvatar);
            findUser.updateAvatar(avatar);
        }
    }

    public void deleteOne(Avatar file) {
        if (file != null) {
            s3Uploader.delete(file.getName());
        }
    }
}
