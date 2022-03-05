package com.minibeit.post.service.integrate;

import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostFile;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostFiles {
    PostFile upload(Post post, MultipartFile multipartFile);

    List<PostFile> uploadFiles(Post post, List<MultipartFile> multipartFiles);
}
