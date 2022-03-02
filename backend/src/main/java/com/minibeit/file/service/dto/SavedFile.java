package com.minibeit.file.service.dto;

import com.minibeit.file.domain.FileServer;
import com.minibeit.file.domain.FileType;
import com.minibeit.post.domain.PostFile;
import com.minibeit.file.domain.Avatar;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class SavedFile {
    private final String name;
    private final String extension;
    private final Long size;
    private final String publicUrl;
    private final Integer width;
    private final Integer height;

    private final boolean isImage;
    private final FileType fileType;
    private final FileServer fileServer;

    public static SavedFile create(String s3FileName, String extension, FileServer fileServer, long fileSize, boolean isImage, String publicUrl, Integer width, Integer height) {
        SavedFile.SavedFileBuilder savedFileBuilder = SavedFile.builder()
                .name(s3FileName)
                .extension(extension)
                .fileServer(fileServer)
                .size(fileSize)
                .isImage(isImage)
                .publicUrl(publicUrl)
                .width(width)
                .height(height);
        if (isImage) {
            return savedFileBuilder.fileType(FileType.IMAGE).build();
        }
        return savedFileBuilder.fileType(FileType.FILE).build();
    }

    public Avatar toAvatar() {
        return Avatar.builder()
                .name(name)
                .type(fileType)
                .server(fileServer)
                .extension(extension)
                .size(size)
                .url(publicUrl)
                .width(width)
                .height(height)
                .build();
    }

    public PostFile toPostFile() {
        return PostFile.builder()
                .name(name)
                .type(fileType)
                .server(fileServer)
                .extension(extension)
                .size(size)
                .url(publicUrl)
                .width(width)
                .height(height)
                .build();
    }
}
