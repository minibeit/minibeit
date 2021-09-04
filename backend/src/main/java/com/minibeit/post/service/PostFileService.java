package com.minibeit.post.service;

import com.minibeit.common.component.file.S3Uploader;
import com.minibeit.file.dto.SavedFile;
import com.minibeit.post.domain.PostFile;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PostFileService {
    private final S3Uploader s3Uploader;

    public List<PostFile> uploadFiles(List<MultipartFile> files) {
        List<SavedFile> savedFiles = new ArrayList<>();
        if (files != null) {
            savedFiles = s3Uploader.uploadFileList(files);
        }
        return savedFiles.stream().map(PostFile::create).collect(Collectors.toList());
    }
}