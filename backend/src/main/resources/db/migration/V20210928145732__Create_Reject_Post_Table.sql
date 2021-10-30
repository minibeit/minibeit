DROP TABLE IF EXISTS `reject_post`;
CREATE TABLE `reject_post`
(
    `id`             BIGINT       NOT NULL AUTO_INCREMENT,
    `user_id`        BIGINT       NOT NULL,
    `title`          VARCHAR(100) NOT NULL,
    `place`          VARCHAR(100) NOT NULL,
    `contact`        VARCHAR(50)  NOT NULL,
    `do_time`        INTEGER      NOT NULL,
    `do_date`        DATETIME     NOT NULL,
    `reject_comment` VARCHAR(255) NOT NULL,
    `created_at`     DATETIME     NOT NULL,
    `updated_at`     DATETIME DEFAULT NULL,
    `deleted_at`     DATETIME DEFAULT NULL,
    `created_by`     BIGINT   DEFAULT NULL,
    `updated_by`     BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`)
);

CREATE INDEX `user_id_index` ON `reject_post` (`user_id`);