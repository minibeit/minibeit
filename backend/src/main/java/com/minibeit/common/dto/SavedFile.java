package com.minibeit.common.dto;

import com.minibeit.avatar.domain.AvatarServer;
import com.minibeit.avatar.domain.AvatarType;
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
    private final AvatarType avatarType;
    private final AvatarServer avatarServer;

    public static SavedFile create(String s3FileName, String extension, AvatarServer avatarServer, String originalName, long fileSize, boolean isImage, String publicUrl, Integer width, Integer height) {
        SavedFile.SavedFileBuilder savedFileBuilder = SavedFile.builder()
                .name(s3FileName)
                .extension(extension)
                .avatarServer(avatarServer)
                .originalName(originalName)
                .size(fileSize)
                .isImage(isImage)
                .publicUrl(publicUrl)
                .width(width)
                .height(height);
        if (isImage) {
            return savedFileBuilder.avatarType(AvatarType.IMAGE).build();
        }
        return savedFileBuilder.avatarType(AvatarType.FILE).build();
    }
}
