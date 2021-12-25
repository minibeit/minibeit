package com.minibeit.file.domain;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.file.service.dto.SavedFile;
import com.minibeit.post.domain.Post;
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

    private void setPost(Post post) {
        this.post = post;
        post.getPostFileList().add(this);
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
                .build();
        postFile.setPost(post);
        return postFile;
    }
}
