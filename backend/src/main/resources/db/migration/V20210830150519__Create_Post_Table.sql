DROP TABLE IF EXISTS `post`;
CREATE TABLE `post`
(
    `id`                       BIGINT       NOT NULL AUTO_INCREMENT,
    `school_id`                BIGINT       NOT NULL,
    `interests_id`             BIGINT       NOT NULL,
    `business_profile_id`      BIGINT       NOT NULL,
    `title`                    VARCHAR(100) NOT NULL,
    `content`                  VARCHAR(255),
    `place`                    VARCHAR(100) NOT NULL,
    `recruit_people`           INTEGER      NOT NULL,
    `contact`                  VARCHAR(50)  NOT NULL,
    `payment`                  VARCHAR(50)  NOT NULL,
    `payment_cache`            INTEGER,
    `payment_goods`            VARCHAR(255),
    `recruit_condition`        TINYINT(1)   NOT NULL,
    `recruit_condition_detail` VARCHAR(200),
    `do_time`                  INTEGER      NOT NULL,
    `start_date`               DATETIME,
    `end_date`                 DATETIME,
    `created_at`               DATETIME     NOT NULL,
    `updated_at`               DATETIME DEFAULT NULL,
    `deleted_at`               DATETIME DEFAULT NULL,
    `created_by`               BIGINT   DEFAULT NULL,
    `updated_by`               BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`)
);
