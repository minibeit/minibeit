package com.minibeit.file.avatar.domain;

import com.minibeit.file.domain.FileServer;
import com.minibeit.file.domain.FileType;
import com.minibeit.file.service.dto.SavedFile;
import com.minibeit.file.domain.Avatar;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("아바타 도메인 테스트")
class AvatarTest {

    @Test
    @DisplayName("아바타 파일 생성")
    void create() {
        SavedFile savedFile = SavedFile.builder()
                .name("파이리")
                .fileServer(FileServer.S3)
                .fileType(FileType.FILE)
                .isImage(false)
                .size(3L).build();

        Avatar avatar = Avatar.create(savedFile.toAvatar());
        assertThat(avatar.getName()).isEqualTo(savedFile.getName());
        assertThat(avatar.getType()).isEqualTo(savedFile.getFileType());
    }
}