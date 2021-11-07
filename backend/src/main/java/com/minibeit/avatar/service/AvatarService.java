package com.minibeit.avatar.service;

import com.minibeit.avatar.domain.Avatar;
import com.minibeit.avatar.domain.repository.AvatarRepository;
import com.minibeit.common.component.file.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class AvatarService {
    private final AvatarRepository avatarRepository;
    private final S3Uploader s3Uploader;

    public Avatar upload(MultipartFile file) {
        if (file == null) {
            return null;
        }
        return avatarRepository.save(Avatar.create(s3Uploader.upload(file)));
    }

    public void deleteOne(Avatar file) {
        if (file != null) {
            avatarRepository.delete(file);
            s3Uploader.delete(file.getName());
        }
    }
}
