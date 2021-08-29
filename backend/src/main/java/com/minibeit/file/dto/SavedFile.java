package com.minibeit.file.dto;

import com.minibeit.file.domain.FileServer;
import com.minibeit.file.domain.FileType;
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
}
