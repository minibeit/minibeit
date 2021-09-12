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
}
