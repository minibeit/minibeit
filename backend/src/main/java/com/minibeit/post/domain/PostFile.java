package com.minibeit.post.domain;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.file.domain.FileServer;
import com.minibeit.file.domain.FileType;
import com.minibeit.file.dto.SavedFile;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "post_file")
public class PostFile extends BaseEntity {
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    public void setPost(Post post) {
        this.post = post;
    }

    public static PostFile create(SavedFile file) {
        return PostFile.builder()
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