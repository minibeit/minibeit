package com.minibeit.avatar.service;

import com.minibeit.avatar.domain.Avatar;
import com.minibeit.common.component.file.S3Uploader;
import com.minibeit.avatar.domain.repository.AvatarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
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
