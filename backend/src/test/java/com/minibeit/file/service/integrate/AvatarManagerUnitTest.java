package com.minibeit.file.service.integrate;

import com.minibeit.file.domain.S3Uploader;
import com.minibeit.file.domain.repository.AvatarRepository;
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

@DisplayName("AvatarManager 단위 테스트")
@ExtendWith(MockitoExtension.class)
public class AvatarManagerUnitTest {
    @Mock
    S3Uploader s3Uploader;
    @Mock
    AvatarRepository avatarRepository;
    @InjectMocks
    AvatarManager avatars;

    @Test
    @DisplayName("파일 업로드 성공")
    public void upload() {
        given(s3Uploader.upload(any())).willReturn(SAVED_FILE);

        avatars.upload(MULTIPART_FILE);

        verify(s3Uploader).upload(any());
    }

    @Test
    @DisplayName("파일 업데이트 성공(삭제 -> 생성)")
    public void update() {
        given(s3Uploader.upload(any())).willReturn(SAVED_FILE);

        avatars.update(Boolean.TRUE, MULTIPART_FILE, AVATAR);

        verify(s3Uploader).delete(any());
        verify(s3Uploader).upload(any());
    }

    @Test
    @DisplayName("파일 삭제 성공")
    public void deleteOne() {
        avatars.deleteOne(AVATAR);

        verify(s3Uploader).delete(any());
        verify(avatarRepository).delete(any());
    }
}
