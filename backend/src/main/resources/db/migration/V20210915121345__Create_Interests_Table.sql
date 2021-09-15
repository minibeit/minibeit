DROP TABLE IF EXISTS `interests`;
CREATE TABLE `interests`
(
    `id`   BIGINT       NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `interests` (name)
VALUES ('경영·마케팅'),
       ('IT·모바일'),
       ('디자인'),
       ('체육'),
       ('음악'),
       ('교육'),
       ('건설'),
       ('미디어·사회'),
       ('인지·심리'),
       ('의료·헬스케어'),
       ('모빌리티'),
       ('경제'),
       ('정치'),
       ('생활·문화'),
       ('패션·뷰티'),
       ('식품'),
       ('종교'),
       ('제조·공업'),
       ('기타')