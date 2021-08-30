DROP TABLE IF EXISTS `post_file`;
CREATE TABLE `post_file`
(
    `id`         BIGINT        NOT NULL AUTO_INCREMENT,
    `post_id`    BIGINT        NOT NULL,
    `server`     VARCHAR(255)  NOT NULL,
    `type`       VARCHAR(255)  NOT NULL,
    `url`        VARCHAR(2083) NOT NULL,
    `name`       VARCHAR(255)  NOT NULL,
    `extension`  VARCHAR(255)  NOT NULL,
    `size`       BIGINT        NOT NULL,
    `width`      INT,
    `height`     INT,
    `created_at` DATETIME      NOT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    `deleted_at` DATETIME DEFAULT NULL,
    `created_by` BIGINT   DEFAULT NULL,
    `updated_by` BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`)
);