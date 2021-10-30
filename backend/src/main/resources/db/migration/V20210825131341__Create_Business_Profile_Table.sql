DROP TABLE IF EXISTS `business_profile`;
CREATE TABLE `business_profile`
(
    `id`         BIGINT       NOT NULL AUTO_INCREMENT,
    `avatar_id`  BIGINT,
    `admin_id`   BIGINT       NOT NULL,
    `name`       VARCHAR(100) NOT NULL,
    `place`      VARCHAR(100) NOT NULL,
    `contact`    VARCHAR(50)  NOT NULL,
    `created_at` DATETIME     NOT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    `deleted_at` DATETIME DEFAULT NULL,
    `created_by` BIGINT   DEFAULT NULL,
    `updated_by` BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`)
);