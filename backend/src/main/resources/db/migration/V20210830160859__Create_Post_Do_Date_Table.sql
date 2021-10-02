DROP TABLE IF EXISTS `post_do_date`;
CREATE TABLE `post_do_date`
(
    `id`         BIGINT     NOT NULL AUTO_INCREMENT,
    `post_id`    BIGINT     NOT NULL,
    `group_id`   INT        NOT NULL,
    `do_date`    DATETIME   NOT NULL,
    `is_full`     TINYINT(1) NOT NULL,
    `created_at` DATETIME   NOT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    `deleted_at` DATETIME DEFAULT NULL,
    `created_by` BIGINT   DEFAULT NULL,
    `updated_by` BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`)
);
