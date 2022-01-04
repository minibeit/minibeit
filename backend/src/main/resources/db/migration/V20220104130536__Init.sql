DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `school`;
DROP TABLE IF EXISTS `business_profile`;
DROP TABLE IF EXISTS `user_business_profile`;
DROP TABLE IF EXISTS `avatar`;
DROP TABLE IF EXISTS `post`;
DROP TABLE IF EXISTS `post_file`;
DROP TABLE IF EXISTS `post_do_date`;
DROP TABLE IF EXISTS `post_applicant`;
DROP TABLE IF EXISTS `post_like`;
DROP TABLE IF EXISTS `reject_post`;
DROP TABLE IF EXISTS `user_verification_code`;
DROP TABLE IF EXISTS `business_user_review`;
DROP TABLE IF EXISTS `business_user_review_detail`;

CREATE TABLE `school`
(
    `id`   BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100),
    PRIMARY KEY (`id`)
);

INSERT INTO `school` (name)
VALUES ('덕성여자대학교'),
       ('한국성서대학교'),
       ('삼육대학교'),
       ('서울여자대학교'),
       ('서울과학기술대학교'),
       ('인덕대학교'),
       ('광운대학교'),
       ('서일대학교'),
       ('경희대학교'),
       ('한국외국어대학교'),
       ('삼육보건대학교'),
       ('서울시립대학교'),
       ('국민대학교'),
       ('서경대학교'),
       ('동덕여자대학교'),
       ('한국예술종합학교'),
       ('고려대학교'),
       ('성신여자대학교'),
       ('한성대학교'),
       ('상명대학교'),
       ('배화여자대학교'),
       ('성균관대학교'),
       ('서울대학교 의학/치의학 대학원'),
       ('홍익대학교(국제디자인전문대학원)'),
       ('가톨릭대학교(제3캠퍼스)'),
       ('덕성여자대학교(교육대학원,문화산업 대학원)'),
       ('서울기독대학교'),
       ('서울여자간호대학교'),
       ('명지전문대학'),
       ('명지대학교(제2캠퍼스(인문캠퍼스))'),
       ('연세대학교'),
       ('경기대학교(제2캠퍼스))'),
       ('이화여자대학교'),
       ('추계예술대학교'),
       ('홍익대학교'),
       ('서강대학교'),
       ('숙명여자대학교'),
       ('한국폴리텍대학(서울정수캠퍼스)'),
       ('동국대학교'),
       ('숭의여자대학교'),
       ('정화예술대학교'),
       ('정화예술대학교(제2캠퍼스)'),
       ('한양대학교'),
       ('세종대학교'),
       ('건국대학교'),
       ('한국체육대학교'),
       ('국제예술대학교'),
       ('가톨릭대학교(제2캠퍼스)'),
       ('서울교육대학교'),
       ('백석예술대학교'),
       ('중앙대학교(서울캠퍼스)'),
       ('숭실대학교'),
       ('총신대학교'),
       ('케이씨대학교'),
       ('한국폴리텍대학(서울강서캠퍼스)'),
       ('이화여자대학교(의학전문대학원)'),
       ('이화여자대학교(임상치의학대학원)'),
       ('동양미래대학교'),
       ('서울한영대학교'),
       ('성공회대학교'),
       ('서울대학교');

CREATE INDEX `name_index` ON `school` (`name`);

CREATE TABLE `avatar`
(
    `id`         BIGINT        NOT NULL AUTO_INCREMENT,
    `server`     VARCHAR(255)  NOT NULL,
    `type`       VARCHAR(255)  NOT NULL,
    `url`        VARCHAR(2083) NOT NULL,
    `name`       VARCHAR(255)  NOT NULL,
    `extension`  VARCHAR(255)  NOT NULL,
    `size`       BIGINT        NOT NULL,
    `width`      INT,
    `height`     INT,
    `created_at` DATETIME      NOT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    `deleted_at` DATETIME DEFAULT NULL,
    `created_by` BIGINT   DEFAULT NULL,
    `updated_by` BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `user`
(
    `id`           BIGINT      NOT NULL AUTO_INCREMENT,
    `school_id`    BIGINT,
    `avatar_id`    BIGINT,
    `oauth_id`     VARCHAR(50) NOT NULL,
    `name`         VARCHAR(50),
    `nickname`     VARCHAR(50),
    `email`        VARCHAR(100),
    `job`          VARCHAR(50),
    `gender`       VARCHAR(10),
    `birth`        DATE,
    `provider`     VARCHAR(30) NOT NULL,
    `phone_num`    VARCHAR(100),
    `signup_check` TINYINT(1)  NOT NULL,
    `role`         VARCHAR(20) NOT NULL,
    `created_at`   DATETIME    NOT NULL,
    `updated_at`   DATETIME DEFAULT NULL,
    `deleted_at`   DATETIME DEFAULT NULL,
    `created_by`   BIGINT   DEFAULT NULL,
    `updated_by`   BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`),
    foreign key (school_id) references school (id),
    foreign key (avatar_id) references avatar (id)
);
CREATE INDEX `nickname_index` ON `user` (`nickname`);

CREATE TABLE `business_profile`
(
    `id`           BIGINT       NOT NULL AUTO_INCREMENT,
    `avatar_id`    BIGINT,
    `admin_id`     BIGINT       NOT NULL,
    `name`         VARCHAR(100) NOT NULL,
    `place`        VARCHAR(100) NOT NULL,
    `place_detail` VARCHAR(100) NOT NULL,
    `contact`      VARCHAR(50)  NOT NULL,
    `created_at`   DATETIME     NOT NULL,
    `updated_at`   DATETIME DEFAULT NULL,
    `deleted_at`   DATETIME DEFAULT NULL,
    `created_by`   BIGINT   DEFAULT NULL,
    `updated_by`   BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`),
    foreign key (avatar_id) references avatar (id),
    foreign key (admin_id) references user (id)
);

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
    PRIMARY KEY (`id`),
    foreign key (user_id) references user (id),
    foreign key (business_profile_id) references business_profile (id)
);

CREATE TABLE `post`
(
    `id`                       BIGINT       NOT NULL AUTO_INCREMENT,
    `school_id`                BIGINT       NOT NULL,
    `business_profile_id`      BIGINT       NOT NULL,
    `title`                    VARCHAR(100) NOT NULL,
    `content`                  TEXT,
    `place`                    VARCHAR(100) NOT NULL,
    `place_detail`             VARCHAR(50)  NOT NULL,
    `category`                 VARCHAR(100) NOT NULL,
    `recruit_people`           INTEGER      NOT NULL,
    `thumbnail`                VARCHAR(2083),
    `contact`                  VARCHAR(50)  NOT NULL,
    `payment`                  VARCHAR(50)  NOT NULL,
    `payment_cache`            INTEGER,
    `payment_goods`            VARCHAR(255),
    `payment_detail`           VARCHAR(255),
    `recruit_condition`        TINYINT(1)   NOT NULL,
    `recruit_condition_detail` VARCHAR(200),
    `do_time`                  INTEGER      NOT NULL,
    `post_status`              VARCHAR(50)  NOT NULL,
    `start_date`               DATETIME,
    `end_date`                 DATETIME,
    `created_at`               DATETIME     NOT NULL,
    `updated_at`               DATETIME DEFAULT NULL,
    `deleted_at`               DATETIME DEFAULT NULL,
    `created_by`               BIGINT   DEFAULT NULL,
    `updated_by`               BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`),
    foreign key (school_id) references school (id),
    foreign key (business_profile_id) references business_profile (id)
);

CREATE TABLE `post_file`
(
    `id`         BIGINT        NOT NULL AUTO_INCREMENT,
    `post_id`    BIGINT        NOT NULL,
    `server`     VARCHAR(255)  NOT NULL,
    `type`       VARCHAR(255)  NOT NULL,
    `url`        VARCHAR(2083) NOT NULL,
    `name`       VARCHAR(255)  NOT NULL,
    `extension`  VARCHAR(255)  NOT NULL,
    `size`       BIGINT        NOT NULL,
    `width`      INT,
    `height`     INT,
    `created_at` DATETIME      NOT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    `deleted_at` DATETIME DEFAULT NULL,
    `created_by` BIGINT   DEFAULT NULL,
    `updated_by` BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`),
    foreign key (post_id) references post (id)
);

CREATE TABLE `post_do_date`
(
    `id`         BIGINT     NOT NULL AUTO_INCREMENT,
    `post_id`    BIGINT     NOT NULL,
    `do_date`    DATETIME   NOT NULL,
    `is_full`    TINYINT(1) NOT NULL,
    `created_at` DATETIME   NOT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    `deleted_at` DATETIME DEFAULT NULL,
    `created_by` BIGINT   DEFAULT NULL,
    `updated_by` BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`),
    foreign key (post_id) references post (id)
);
CREATE INDEX `do_date_index` ON `post_do_date` (`do_date`);


CREATE TABLE `post_applicant`
(
    `id`                 BIGINT      NOT NULL AUTO_INCREMENT,
    `user_id`            BIGINT      NOT NULL,
    `post_do_date_id`    BIGINT      NOT NULL,
    `apply_status`       VARCHAR(50) NOT NULL,
    `business_finish`    TINYINT(1)  NOT NULL,
    `write_review`       TINYINT(1)  NOT NULL,
    `evaluated_business` TINYINT(1)  NOT NULL,
    `created_at`         DATETIME    NOT NULL,
    `updated_at`         DATETIME DEFAULT NULL,
    `deleted_at`         DATETIME DEFAULT NULL,
    `created_by`         BIGINT   DEFAULT NULL,
    `updated_by`         BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`),
    foreign key (user_id) references user (id),
    foreign key (post_do_date_id) references post_do_date (id)
);
CREATE INDEX `apply_status_index` ON `post_applicant` (`apply_status`);

CREATE TABLE `post_like`
(
    `id`         BIGINT   NOT NULL AUTO_INCREMENT,
    `post_id`    BIGINT   NOT NULL,
    `user_id`    BIGINT   NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    `deleted_at` DATETIME DEFAULT NULL,
    `created_by` BIGINT   DEFAULT NULL,
    `updated_by` BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`),
    foreign key (post_id) references post (id),
    foreign key (user_id) references user (id)
);

CREATE TABLE `reject_post`
(
    `id`                    BIGINT       NOT NULL AUTO_INCREMENT,
    `user_id`               BIGINT       NOT NULL,
    `business_profile_name` VARCHAR(100) NOT NULL,
    `title`                 VARCHAR(100) NOT NULL,
    `place`                 VARCHAR(100) NOT NULL,
    `place_detail`          VARCHAR(50)  NOT NULL,
    `category`              VARCHAR(100) NOT NULL,
    `contact`               VARCHAR(50)  NOT NULL,
    `recruit_condition`     TINYINT(1)   NOT NULL,
    `do_time`               INTEGER      NOT NULL,
    `do_date`               DATETIME     NOT NULL,
    `reject_comment`        VARCHAR(255) NOT NULL,
    `created_at`            DATETIME     NOT NULL,
    `updated_at`            DATETIME DEFAULT NULL,
    `deleted_at`            DATETIME DEFAULT NULL,
    `created_by`            BIGINT   DEFAULT NULL,
    `updated_by`            BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`),
    foreign key (user_id) references user (id)
);

CREATE TABLE `user_verification_code`
(
    `id`                 BIGINT      NOT NULL AUTO_INCREMENT,
    `user_id`            BIGINT      NOT NULL,
    `code`               VARCHAR(20) NOT NULL,
    `verification_kinds` VARCHAR(20) NOT NULL,
    `expiration_date`    DATETIME    NOT NULL,
    `created_at`         DATETIME    NOT NULL,
    `updated_at`         DATETIME DEFAULT NULL,
    `deleted_at`         DATETIME DEFAULT NULL,
    `created_by`         BIGINT   DEFAULT NULL,
    `updated_by`         BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`),
    foreign key (user_id) references user (id)
);

CREATE TABLE `business_user_review_detail`
(
    `id`        BIGINT      NOT NULL AUTO_INCREMENT,
    `content`   VARCHAR(60) NOT NULL,
    `type`      VARCHAR(20) NOT NULL,
    `eval_type` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `business_user_review_detail` (content, type, eval_type)
VALUES ('예상보다 소요 시간이 적었어요', 'B', 'GOOD'),
       ('참여 경험이 흥미로웠어요', 'B', 'GOOD'),
       ('참여에 대한 보상이 충분해요', 'B', 'GOOD'),
       ('구성원들이 친절하고 편안했어요', 'B', 'GOOD'),
       ('아무것도 선택하지 않을래요', 'B', 'GOOD'),
       ('예상 소요 시간을 초과하였어요', 'B', 'BAD'),
       ('참여에 대한 보상이 아쉬워요', 'B', 'BAD'),
       ('참여 경험이 다소 지루했어요', 'B', 'BAD'),
       ('구성원들이 다소 불편했어요', 'B', 'BAD'),
       ('아무것도 선택하지 않을래요', 'B', 'BAD'),
       ('약속 시간을 잘 지키셨어요.', 'U', 'GOOD'),
       ('참여에 대한 태도가 좋았어요.', 'U', 'GOOD'),
       ('참여 조건에 적합했어요.', 'U', 'GOOD'),
       ('연락이 잘 되었어요.', 'U', 'GOOD'),
       ('의사소통이 잘 이루어졌어요.', 'U', 'GOOD'),
       ('아무것도 선택하지 않을래요.', 'U', 'GOOD'),
       ('약속 시간을 경과했어요.', 'U', 'BAD'),
       ('참여에 대한 태도가 아쉬웠어요.', 'U', 'BAD'),
       ('참여 조건에 대해 잘못 인지하였어요.', 'U', 'BAD'),
       ('노쇼를 하였어요.', 'U', 'BAD'),
       ('의사소통이 어려웠어요.', 'U', 'BAD'),
       ('아무것도 선택하지 않을래요.', 'U', 'BAD');

CREATE TABLE `business_user_review`
(
    `id`                        BIGINT   NOT NULL AUTO_INCREMENT,
    `business_profile_id`       BIGINT   NOT NULL,
    `business_review_detail_id` BIGINT   NOT NULL,
    `user_id`                   BIGINT   NOT NULL,
    `created_at`                DATETIME NOT NULL,
    `updated_at`                DATETIME DEFAULT NULL,
    `deleted_at`                DATETIME DEFAULT NULL,
    `created_by`                BIGINT   DEFAULT NULL,
    `updated_by`                BIGINT   DEFAULT NULL,
    PRIMARY KEY (`id`),
    foreign key (business_profile_id) references business_profile (id),
    foreign key (business_review_detail_id) references business_user_review_detail (id),
    foreign key (user_id) references user (id)
);
