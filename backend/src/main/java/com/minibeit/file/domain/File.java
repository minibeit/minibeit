package com.minibeit.file.domain;

import javax.persistence.Enumerated;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.file.dto.SavedFile;
import lombok.*;
import javax.persistence.*;


@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "file")
public class File extends BaseEntity {
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

    public static File create(SavedFile file) {
        return File.builder()
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

    public static File createExternalImage(String url) {
        return File.builder()
                .url(url)
                .server(FileServer.EXTERNAL)
                .extension("")
                .height(0)
                .size(0L)
                .type(FileType.IMAGE)
                .width(0)
                .name("")
                .build();
    }
}
