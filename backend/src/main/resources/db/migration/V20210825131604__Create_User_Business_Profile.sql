DROP TABLE IF EXISTS `user_business_profile`;
CREATE TABLE `user_business_profile`
(
    `id`                  BIGINT   NOT NULL AUTO_INCREMENT,
    `user_id`             BIGINT   NOT NULL,
    `business_profile_id` BIGINT   NOT NULL,
    `created_at`          DATETIME NOT NULL,
    `updated_at`          DATETIME DEFAULT NULL,
    `deleted_at`          DATETIME DEFAULT NULL,
    `created_by`          BIGINT   DEFAULT NULL,
    `updated_by`          BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`)
);

CREATE INDEX `business_profile_id_index` ON `user_business_profile` (`business_profile_id`);
CREATE INDEX `user_id_index` ON `user_business_profile` (`user_id`);