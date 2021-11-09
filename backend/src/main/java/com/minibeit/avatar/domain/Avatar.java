package com.minibeit.avatar.domain;

import javax.persistence.Enumerated;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.common.domain.FileServer;
import com.minibeit.common.domain.FileType;
import com.minibeit.common.dto.SavedFile;
import lombok.*;
import javax.persistence.*;


@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "avatar")
public class Avatar extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private FileServer server;

    @Enumerated(EnumType.STRING)
    private FileType type;

    private String name;
    private String extension;
    private String url;
    private Long size;

    private Integer width;
    private Integer height;

    public static Avatar create(SavedFile file) {
        return Avatar.builder()
                .name(file.getName())
                .type(file.getFileType())
                .server(file.getFileServer())
                .extension(file.getExtension())
                .height(file.getHeight())
                .width(file.getWidth())
                .size(file.getSize())
                .url(file.getPublicUrl())
                .build();
    }
}
