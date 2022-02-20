package com.minibeit.post.domain;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostFileService {
    void uploadThumbnail(Post post, MultipartFile file);

    void uploadFiles(Post post, List<MultipartFile> files);
}
