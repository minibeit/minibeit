package com.minibeit.file.service;

import com.minibeit.common.component.file.S3Uploader;
import com.minibeit.file.domain.File;
import com.minibeit.file.domain.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
@RequiredArgsConstructor
public class FileService {
    private final FileRepository fileRepository;
    private final S3Uploader s3Uploader;

    public File upload(MultipartFile file) {
        if (file == null) {
            return null;
        }
        return fileRepository.save(File.create(s3Uploader.upload(file)));
    }

    public void deleteOne(File file) {
        if (file != null) {
            fileRepository.delete(file);
        }
    }
}
