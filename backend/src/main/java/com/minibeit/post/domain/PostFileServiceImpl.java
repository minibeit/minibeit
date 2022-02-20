package com.minibeit.post.domain;

import com.minibeit.file.domain.S3Uploader;
import com.minibeit.file.service.dto.SavedFile;
import com.minibeit.post.domain.repository.PostFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PostFileServiceImpl implements PostFileService {
    private final S3Uploader s3Uploader;
    private final PostFileRepository postFileRepository;

    @Override
    public void uploadThumbnail(Post post, MultipartFile file) {
        if (file != null) {
            SavedFile uploadedThumbnail = s3Uploader.upload(file);
            PostFile createdThumbnail = PostFile.create(post, uploadedThumbnail.toPostFile());
            post.updateThumbnail(createdThumbnail.getUrl());
            postFileRepository.save(createdThumbnail);
        }
    }

    @Override
    public void uploadFiles(Post post, List<MultipartFile> files) {
        if (files != null) {
            List<SavedFile> savedFiles = s3Uploader.uploadFileList(files);
            List<PostFile> postFiles = savedFiles.stream().map(savedFile -> PostFile.create(post, savedFile.toPostFile())).collect(Collectors.toList());
            postFileRepository.saveAll(postFiles);
        }
    }
}
