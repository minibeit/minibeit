package com.minibeit.avatar.domain;

import com.minibeit.common.domain.FileServer;
import com.minibeit.common.domain.FileType;
import com.minibeit.common.dto.SavedFile;
import javassist.bytecode.stackmap.TypeData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@DisplayName("아바타 도메인 테스트")
class AvatarTest {

    @Test
    @DisplayName("아바타 파일 생성")
    void create() {
        SavedFile savedFile = SavedFile.builder()
                .originalName("원본이름")
                .name("파이리")
                .fileServer(FileServer.S3)
                .fileType(FileType.FILE)
                .isImage(false)
                .size(3L).build();

        Avatar avatar = Avatar.create(savedFile);
        assertThat(avatar.getName()).isEqualTo(savedFile.getName());
        assertThat(avatar.getType()).isEqualTo(savedFile.getFileType());
    }
}