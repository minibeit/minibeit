package com.minibeit.post.service;

import com.minibeit.common.component.file.S3Uploader;
import com.minibeit.common.dto.SavedFile;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostFile;
import com.minibeit.post.domain.repository.PostFileRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.dto.PostResponse;
import com.minibeit.post.service.exception.PostNotFoundException;
import com.minibeit.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PostFileService {
    private final S3Uploader s3Uploader;
    private final PostFileRepository postFileRepository;
    private final PostRepository postRepository;
    private final PostPermissionCheck postPermissionCheck;

    public PostResponse.OnlyId addFiles(Long postId, PostRequest.AddFile request, User user) {
        Post post = postRepository.findByIdWithBusinessProfile(postId).orElseThrow(PostNotFoundException::new);
        postPermissionCheck.userInBusinessProfileCheck(post.getBusinessProfile().getId(), user);

        List<SavedFile> savedFiles = new ArrayList<>();
        if (request.getFiles() != null) {
            savedFiles = s3Uploader.uploadFileList(request.getFiles());
        }
        List<PostFile> postFiles = savedFiles.stream().map(postFile -> PostFile.create(post, postFile)).collect(Collectors.toList());
        postFileRepository.saveAll(postFiles);

        return PostResponse.OnlyId.build(post);
    }
}
