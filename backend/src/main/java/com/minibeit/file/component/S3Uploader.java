package com.minibeit.file.component;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.minibeit.file.domain.FileServer;
import com.minibeit.file.domain.FileType;
import com.minibeit.file.dto.SavedFile;
import com.minibeit.file.service.exception.S3FileUploadException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class S3Uploader {
    private final AmazonS3Client s3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String s3Bucket;
    @Value("${cloud.aws.s3.public}")
    private String s3Public;

    public List<SavedFile> uploadFileList(List<MultipartFile> files) {
        return files.stream().map(this::upload).collect(Collectors.toList());
    }

    public SavedFile upload(MultipartFile file) {
        String originalName = file.getOriginalFilename();
        String extension = Optional.ofNullable(originalName)
                .filter(s -> s.contains("."))
                .map(s -> s.substring(originalName.lastIndexOf(".") + 1))
                .orElse(null);
        String s3FileName = Optional.ofNullable(RandomStringBuilder.generateAlphaNumeric(60)).orElseThrow() + "." + extension;
        String publicUrl = s3Public + "/" + s3FileName;

        boolean isImage = this.isImage(extension);
        Integer width = null;
        Integer height = null;
        try {
            putS3(file, s3FileName);
            if (isImage) {
                BufferedImage image = ImageIO.read(file.getInputStream());
                width = image.getWidth();
                height = image.getHeight();
            }
        } catch (IOException e) {
            throw new S3FileUploadException();
        }
        SavedFile.SavedFileBuilder savedFileBuilder = SavedFile.builder()
                .name(s3FileName)
                .extension(extension)
                .fileServer(FileServer.S3)
                .originalName(originalName)
                .size(file.getSize())
                .isImage(isImage)
                .publicUrl(publicUrl)
                .width(width)
                .height(height);
        if (isImage) {
            return savedFileBuilder.fileType(FileType.IMAGE).build();
        }
        return savedFileBuilder.fileType(FileType.FILE).build();
    }

    private void putS3(MultipartFile uploadFile, String fileName) throws IOException {
        s3Client.putObject(new PutObjectRequest(s3Bucket, fileName, uploadFile.getInputStream(), null).withCannedAcl(CannedAccessControlList.PublicRead));
    }

    private boolean isImage(String extension) {
        return Optional.ofNullable(extension)
                .map(s -> s.toLowerCase().matches("png|jpeg|jpg|bmp|gif|svg"))
                .orElse(false);
    }
}
