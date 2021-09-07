DROP TABLE IF EXISTS `post_review`;
CREATE TABLE `post_review`
(
    `id`         BIGINT       NOT NULL AUTO_INCREMENT,
    `post_id`    BIGINT       NOT NULL,
    `content`    VARCHAR(255) NOT NULL,
    `created_at` DATETIME     NOT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    `deleted_at` DATETIME DEFAULT NULL,
    `created_by` BIGINT   DEFAULT NULL,
    `updated_by` BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`)
);
