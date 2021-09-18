DROP TABLE IF EXISTS `business_profile_review`;
CREATE TABLE `business_profile_review`
(
    `id`                  BIGINT       NOT NULL AUTO_INCREMENT,
    `business_profile_id` BIGINT       NOT NULL,
    `post_title`          VARCHAR(100) NOT NULL,
    `content`             VARCHAR(255) NOT NULL,
    `time`                INTEGER      NOT NULL,
    `do_date`             DATETIME     NOT NULL,
    `created_at`          DATETIME     NOT NULL,
    `updated_at`          DATETIME DEFAULT NULL,
    `deleted_at`          DATETIME DEFAULT NULL,
    `created_by`          BIGINT   DEFAULT NULL,
    `updated_by`          BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`)
);
