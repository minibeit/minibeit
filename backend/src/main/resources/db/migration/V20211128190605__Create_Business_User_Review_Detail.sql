DROP TABLE IF EXISTS `business_user_review_detail`;
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