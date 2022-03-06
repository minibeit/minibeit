package com.minibeit.file.service.integrate;

import com.minibeit.file.domain.Avatar;
import com.minibeit.file.domain.S3Uploader;
import com.minibeit.file.domain.repository.AvatarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
class AvatarManager implements Avatars {
    private final S3Uploader s3Uploader;
    private final AvatarRepository avatarRepository;

    @Override
    public Avatar upload(MultipartFile file) {
        if (file == null) {
            return null;
        }
        return Avatar.create(s3Uploader.upload(file).toAvatar());
    }

    @Override
    public Avatar update(Boolean avatarChanged, MultipartFile updatedAvatar, Avatar avatar) {
        if (avatarChanged) {
            deleteOne(avatar);
            return upload(updatedAvatar);
        }
        return null;
    }

    @Override
    public void deleteOne(Avatar file) {
        if (file != null) {
            avatarRepository.delete(file);
            s3Uploader.delete(file.getName());
        }
    }
}
