DROP TABLE IF EXISTS `post_applicant`;
CREATE TABLE `post_applicant`
(
    `id`                 BIGINT      NOT NULL AUTO_INCREMENT,
    `user_id`            BIGINT      NOT NULL,
    `post_do_date_id`    BIGINT      NOT NULL,
    `apply_status`       VARCHAR(50) NOT NULL,
    `my_finish`          TINYINT(1)  NOT NULL,
    `business_finish`    TINYINT(1)  NOT NULL,
    `write_review`       TINYINT(1)  NOT NULL,
    `evaluated_business` TINYINT(1)  NOT NULL,
    `created_at`         DATETIME    NOT NULL,
    `updated_at`         DATETIME DEFAULT NULL,
    `deleted_at`         DATETIME DEFAULT NULL,
    `created_by`         BIGINT   DEFAULT NULL,
    `updated_by`         BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`)
);

CREATE INDEX `post_do_date_id_index` ON `post_applicant` (`post_do_date_id`);
CREATE INDEX `apply_status_index` ON `post_applicant` (`apply_status`);
