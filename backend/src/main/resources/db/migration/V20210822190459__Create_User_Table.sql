DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`
(
    `id`           BIGINT       NOT NULL AUTO_INCREMENT,
    `school_id`    BIGINT,
    `file_id`      BIGINT,
    `oauth_id`     VARCHAR(100) NOT NULL,
    `name`         VARCHAR(100),
    `nickname`     VARCHAR(100),
    `job`          VARCHAR(100),
    `age`          INTEGER,
    `gender`       VARCHAR(10),
    `provider`     VARCHAR(50)  NOT NULL,
    `phone_num`    VARCHAR(50),
    `signup_check` TINYINT(1) NOT NULL,
    `role`         VARCHAR(50)  NOT NULL,
    `created_at`   DATETIME     NOT NULL,
    `updated_at`   DATETIME DEFAULT NULL,
    `deleted_at`   DATETIME DEFAULT NULL,
    `created_by`   BIGINT   DEFAULT NULL,
    `updated_by`   BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`)
);
CREATE
    INDEX `nickname_index` ON `user` (`nickname`);