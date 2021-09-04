DROP TABLE IF EXISTS `post_applicant`;
CREATE TABLE `post_applicant`
(
    `id`          BIGINT      NOT NULL AUTO_INCREMENT,
    `user_id`     BIGINT      NOT NULL,
    `post_id`     BIGINT      NOT NULL,
    `post_status` VARCHAR(50) NOT NULL,
    `finish`      TINYINT(1)     NOT NULL,
    `do_date`     DATETIME    NOT NULL,
    `created_at`  DATETIME    NOT NULL,
    `updated_at`  DATETIME DEFAULT NULL,
    `deleted_at`  DATETIME DEFAULT NULL,
    `created_by`  BIGINT   DEFAULT NULL,
    `updated_by`  BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`)
);
