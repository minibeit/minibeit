DROP TABLE IF EXISTS `user_business_profile`;
CREATE TABLE `user_business_profile`
(
    `id`                  BIGINT      NOT NULL AUTO_INCREMENT,
    `user_id`             BIGINT,
    `business_profile_id` BIGINT,
    `created_at`          DATETIME    NOT NULL,
    `updated_at`          DATETIME DEFAULT NULL,
    `deleted_at`          DATETIME DEFAULT NULL,
    `created_by`          BIGINT   DEFAULT NULL,
    `updated_by`          BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`)
);
