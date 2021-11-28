DROP TABLE IF EXISTS `business_review_detail`;
CREATE TABLE `business_review_detail`
(
    `id`      BIGINT      NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(60) NOT NULL,
    `is_good` TINYINT(1) NOT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `business_review_detail` (content, is_good)
VALUES ('예상보다 소요 시간이 적었어요', true),
       ('참여 경험이 흥미로웠어요', true),
       ('참여에 대한 보상이 충분해요', true),
       ('구성원들이 친절하고 편안했어요', true),
       ('아무것도 선택하지 않을래요', true),
       ('예상 소요 시간을 초과하였어요', false),
       ('참여에 대한 보상이 아쉬워요', false),
       ('참여 경험이 다소 지루했어요', false),
       ('구성원들이 다소 불편했어요', false),
       ('아무것도 선택하지 않을래요', false);