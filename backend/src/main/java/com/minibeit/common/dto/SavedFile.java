package com.minibeit.common.dto;

import com.minibeit.common.domain.FileServer;
import com.minibeit.common.domain.FileType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class SavedFile {
    private final String originalName;
    private final String name;
    private final String extension;
    private final Long size;
    private final String publicUrl;

    private final Integer width;
    private final Integer height;

    private final boolean isImage;
    private final FileType fileType;
    private final FileServer fileServer;

    public static SavedFile create(String s3FileName, String extension, FileServer fileServer, String originalName, long fileSize, boolean isImage, String publicUrl, Integer width, Integer height) {
        SavedFile.SavedFileBuilder savedFileBuilder = SavedFile.builder()
                .name(s3FileName)
                .extension(extension)
                .fileServer(fileServer)
                .originalName(originalName)
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
}
