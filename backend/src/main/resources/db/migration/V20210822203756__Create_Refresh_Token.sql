DROP TABLE IF EXISTS `user_refresh_token`;
CREATE TABLE `user_refresh_token`
(
    `id`          BIGINT       NOT NULL AUTO_INCREMENT,
    `token`       VARCHAR(255) NOT NULL,
    `user_id`     BIGINT       NOT NULL,
    `expiry_date` DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`)
);