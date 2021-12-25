package com.minibeit.file.domain;

import javax.persistence.Enumerated;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.file.service.dto.SavedFile;
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

    public static Avatar create(Avatar avatar) {
        return Avatar.builder()
                .name(avatar.getName())
                .type(avatar.getType())
                .server(avatar.getServer())
                .extension(avatar.getExtension())
                .height(avatar.getHeight())
                .width(avatar.getWidth())
                .size(avatar.getSize())
                .url(avatar.getUrl())
                .build();
    }
}
