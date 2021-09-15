DROP TABLE IF EXISTS `user_interests`;
CREATE TABLE `user_interests`
(
    `id`           BIGINT   NOT NULL AUTO_INCREMENT,
    `user_id`      BIGINT   NOT NULL,
    `interests_id` BIGINT   NOT NULL,
    `created_at`   DATETIME NOT NULL,
    `updated_at`   DATETIME DEFAULT NULL,
    `deleted_at`   DATETIME DEFAULT NULL,
    `created_by`   BIGINT   DEFAULT NULL,
    `updated_by`   BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`)
);
