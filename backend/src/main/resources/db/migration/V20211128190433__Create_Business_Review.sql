DROP TABLE IF EXISTS `business_review`;
CREATE TABLE `business_review`
(
    `id`                        BIGINT NOT NULL AUTO_INCREMENT,
    `business_profile_id`       BIGINT NOT NULL,
    `business_review_detail_id` BIGINT NOT NULL,
    `created_at` DATETIME    NOT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    `deleted_at` DATETIME DEFAULT NULL,
    `created_by` BIGINT   DEFAULT NULL,
    `updated_by` BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`)
);