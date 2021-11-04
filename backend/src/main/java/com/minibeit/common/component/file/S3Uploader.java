package com.minibeit.common.component.file;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.minibeit.avatar.domain.AvatarServer;
import com.minibeit.common.component.exception.S3FileUploadException;
import com.minibeit.common.dto.SavedFile;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class S3Uploader {
    private final AmazonS3Client s3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String s3Bucket;
    @Value("${cloud.aws.s3.public}")
    private String s3Public;
    @Value("${s3.file.prefix}")
    private String fileNamePrefix;

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
            File uploadFile = convert(file)
                    .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));
            putS3(uploadFile, s3FileName);
            if (isImage) {
                BufferedImage image = ImageIO.read(file.getInputStream());
                width = image.getWidth();
                height = image.getHeight();
            }
            removeNewFile(uploadFile);
        } catch (IOException e) {
            log.info(e.getMessage());
            throw new S3FileUploadException();
        }
        return SavedFile.create(s3FileName, extension, AvatarServer.S3, originalName, file.getSize(), isImage, publicUrl, width, height);
    }

    private void putS3(File uploadFile, String fileName) {
        s3Client.putObject(new PutObjectRequest(s3Bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
    }

    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("파일이 삭제되었습니다.");
        } else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }

    private boolean isImage(String extension) {
        return Optional.ofNullable(extension)
                .map(s -> s.toLowerCase().matches("png|jpeg|jpg|bmp|gif|svg"))
                .orElse(false);
    }

    private Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(fileNamePrefix + file.getOriginalFilename());
        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

    public void delete(String fileName) {
        boolean isExistObject = s3Client.doesObjectExist(s3Bucket, fileName);
        if (isExistObject) {
            s3Client.deleteObject(s3Bucket, fileName);
        }
    }
}
