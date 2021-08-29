package com.minibeit.file.component;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Setter
@Getter
@Configuration
@ConfigurationProperties("storage")
public class S3Props {
    String s3Bucket;
    String s3Public;
}
