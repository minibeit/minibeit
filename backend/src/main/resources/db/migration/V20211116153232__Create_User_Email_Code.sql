DROP TABLE IF EXISTS `user_email_code`;
CREATE TABLE `user_email_code`
(
    `id`              BIGINT      NOT NULL AUTO_INCREMENT,
    `user_id`         BIGINT      NOT NULL,
    `code`            VARCHAR(20) NOT NULL,
    `expiration_date` DATETIME    NOT NULL,
    `created_at`      DATETIME    NOT NULL,
    `updated_at`      DATETIME DEFAULT NULL,
    `deleted_at`      DATETIME DEFAULT NULL,
    `created_by`      BIGINT   DEFAULT NULL,
    `updated_by`      BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`)
);