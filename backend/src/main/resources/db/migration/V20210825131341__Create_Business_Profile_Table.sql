DROP TABLE IF EXISTS `business_profile`;
CREATE TABLE `business_profile`
(
    `id`         BIGINT   NOT NULL AUTO_INCREMENT,
    `file_id`    BIGINT,
    `admin_id`   BIGINT,
    `name`       VARCHAR(100),
    `place`      VARCHAR(100),
    `introduce`  VARCHAR(255),
    `contact`    VARCHAR(50),
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    `deleted_at` DATETIME DEFAULT NULL,
    `created_by` BIGINT   DEFAULT NULL,
    `updated_by` BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`)
);
