package com.minibeit.user.service;

import com.minibeit.file.domain.S3Uploader;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static com.minibeit.file.mock.MockFile.MockFile1.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@DisplayName("AvatarService 단위 테스트")
@ExtendWith(MockitoExtension.class)
public class AvatarServiceUnitTest {
    @Mock
    S3Uploader s3Uploader;
    @InjectMocks
    AvatarService avatarService;

    @Test
    @DisplayName("파일 업로드 성공")
    public void upload() {
        given(s3Uploader.upload(any())).willReturn(SAVED_FILE);

        avatarService.upload(MULTIPART_FILE_AVATAR);

        verify(s3Uploader).upload(any());
    }

    @Test
    @DisplayName("파일 삭제 성공")
    public void deleteOne() {
        avatarService.deleteOne(AVATAR);

        verify(s3Uploader).delete(any());
    }
}
