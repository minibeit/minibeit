package com.minibeit.post.service.integrate;

import com.minibeit.file.domain.S3Uploader;
import com.minibeit.file.service.dto.SavedFile;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostFile;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
class PostFileManager implements PostFiles {
    private final S3Uploader s3Uploader;

    @Override
    public PostFile upload(Post post, MultipartFile file) {
        if (file != null) {
            SavedFile uploadedThumbnail = s3Uploader.upload(file);
            return PostFile.create(post, uploadedThumbnail.toPostFile());
        }
        return null;
    }

    @Override
    public List<PostFile> uploadFiles(Post post, List<MultipartFile> files) {
        List<PostFile> postFiles = new ArrayList<>();
        if (files != null) {
            postFiles = files.stream().map(file -> upload(post, file)).collect(Collectors.toList());
        }
        return postFiles;
    }
}
