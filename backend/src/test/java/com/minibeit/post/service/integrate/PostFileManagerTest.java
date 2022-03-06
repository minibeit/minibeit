package com.minibeit.post.service.integrate;

import com.minibeit.file.domain.S3Uploader;
import com.minibeit.file.mock.MockFile;
import com.minibeit.post.service.mock.MockPost;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@DisplayName("PostFileManager 단위 테스트")
@ExtendWith(MockitoExtension.class)
class PostFileManagerTest {
    @Mock
    S3Uploader s3Uploader;
    @InjectMocks
    PostFileManager postFileManager;

    @Test
    @DisplayName("파일 업로드 성공")
    public void upload() {
        given(s3Uploader.upload(any())).willReturn(MockFile.MockFile1.SAVED_FILE);

        postFileManager.upload(MockPost.MockPost1.POST, MockFile.MockFile1.MULTIPART_FILE);

        verify(s3Uploader).upload(any());
    }

    @Test
    @DisplayName("파일이 없을 때 업로드 진행 x")
    public void uploadFileIsNull() {
        postFileManager.upload(MockPost.MockPost1.POST, null);

        verify(s3Uploader, times(0)).upload(any());
    }

    @Test
    @DisplayName("여러개의 파일 업로드 성공")
    public void uploadFiles() {
        given(s3Uploader.upload(any())).willReturn(MockFile.MockFile1.SAVED_FILE);

        postFileManager.uploadFiles(MockPost.MockPost1.POST, Collections.singletonList(MockFile.MockFile1.MULTIPART_FILE));

        verify(s3Uploader).upload(any());
    }

    @Test
    @DisplayName("여러파일이 없을 때 업로드 진행 x")
    public void uploadFilesIsNull() {
        postFileManager.upload(MockPost.MockPost1.POST, null);

        verify(s3Uploader, times(0)).upload(any());
    }
}