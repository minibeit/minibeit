package com.minibeit.post.domain;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.file.domain.FileServer;
import com.minibeit.file.domain.FileType;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "post_file")
@Where(clause = "del=0")
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

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "del")
    private Boolean del;

    public PostFile setPost(Post post) {
        this.post = post;
        post.getPostFileList().add(this);
        return this;
    }

    public void delete() {
        this.del = true;
        this.deletedAt = LocalDateTime.now();
    }

    public static PostFile create(Post post, PostFile file) {
        PostFile postFile = PostFile.builder()
                .name(file.getName())
                .type(file.getType())
                .server(file.getServer())
                .extension(file.getExtension())
                .height(file.getHeight())
                .width(file.getWidth())
                .size(file.getSize())
                .url(file.getUrl())
                .del(false)
                .build();
        postFile.setPost(post);
        return postFile;
    }
}
