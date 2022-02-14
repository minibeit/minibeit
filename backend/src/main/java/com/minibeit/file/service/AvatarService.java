package com.minibeit.file.service;

import com.minibeit.file.domain.Avatar;
import com.minibeit.file.domain.S3Uploader;
import com.minibeit.file.domain.repository.AvatarRepository;
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
        return avatarRepository.save(Avatar.create(s3Uploader.upload(file).toAvatar()));
    }

    public void deleteOne(Avatar file) {
        if (file != null) {
            avatarRepository.delete(file);
            s3Uploader.delete(file.getName());
        }
    }
}
