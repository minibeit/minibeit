DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`
(
    `id`           BIGINT       NOT NULL AUTO_INCREMENT,
    `school_id`    BIGINT,
    `avatar_id`    BIGINT,
    `oauth_id`     VARCHAR(50) NOT NULL,
    `name`         VARCHAR(50),
    `nickname`     VARCHAR(50),
    `job`          VARCHAR(50),
    `gender`       VARCHAR(10),
    `birth`        DATE,
    `provider`     VARCHAR(30)  NOT NULL,
    `phone_num`    VARCHAR(30),
    `signup_check` TINYINT(1)   NOT NULL,
    `role`         VARCHAR(20)  NOT NULL,
    `created_at`   DATETIME     NOT NULL,
    `updated_at`   DATETIME DEFAULT NULL,
    `deleted_at`   DATETIME DEFAULT NULL,
    `created_by`   BIGINT   DEFAULT NULL,
    `updated_by`   BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`)
);
CREATE INDEX `nickname_index` ON `user` (`nickname`);