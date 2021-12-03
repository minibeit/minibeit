UPDATE `business_review_detail`
SET type='B'
WHERE id = 1;
UPDATE `business_review_detail`
SET type='B'
WHERE id = 2;
UPDATE `business_review_detail`
SET type='B'
WHERE id = 3;
UPDATE `business_review_detail`
SET type='B'
WHERE id = 4;
UPDATE `business_review_detail`
SET type='B'
WHERE id = 5;
UPDATE `business_review_detail`
SET type='B'
WHERE id = 6;
UPDATE `business_review_detail`
SET type='B'
WHERE id = 7;
UPDATE `business_review_detail`
SET type='B'
WHERE id = 8;
UPDATE `business_review_detail`
SET type='B'
WHERE id = 9;
UPDATE `business_review_detail`
SET type='B'
WHERE id = 10;

ALTER TABLE `business_review_detail`
    ADD `eval_type` VARCHAR(20) DEFAULT 'GOOD';

ALTER TABLE `business_review`
    ADD `user_id` BIGINT DEFAULT NULL;

UPDATE `business_review_detail`
SET eval_type= 'BAD'
WHERE id = 6;
UPDATE `business_review_detail`
SET eval_type= 'BAD'
WHERE id = 7;
UPDATE `business_review_detail`
SET eval_type= 'BAD'
WHERE id = 8;
UPDATE `business_review_detail`
SET eval_type= 'BAD'
WHERE id = 9;
UPDATE `business_review_detail`
SET eval_type= 'BAD'
WHERE id = 10;

INSERT INTO `business_review_detail` (content, type, eval_type)
VALUES ('약속 시간을 잘 지키셨어요.', 'U', 'GOOD'),
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

RENAME TABLE business_review TO business_user_review;
RENAME TABLE business_review_detail TO business_user_review_detail;