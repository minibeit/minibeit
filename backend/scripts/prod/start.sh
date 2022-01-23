#!/usr/bin/env bash

ABSPATH=$(readlink -f $0)
ABSDIR=$(dirname $ABSPATH)
source ${ABSDIR}/profile.sh

REPOSITORY=/home/ec2-user/app

echo "> Build 파일 복사"
echo "> cp $REPOSITORY/zip/*.jar $REPOSITORY/prod"

cp $REPOSITORY/zip/*.jar $REPOSITORY/prod

echo "> 새 어플리케이션 배포"
JAR_NAME=$(ls -tr $REPOSITORY/prod/*.jar | tail -n 1)

echo "> JAR Name: $JAR_NAME"

echo "> $JAR_NAME 에 실행권한 추가"

chmod +x $JAR_NAME

echo "> $JAR_NAME 실행"

IDLE_PROFILE=$(find_idle_profile)

echo "> $JAR_NAME 를 profile=$IDLE_PROFILE 로 실행합니다."
nohup java -jar \
    -Dspring.config.location=classpath:/application.yml,/home/ec2-user/app/application-prod.yml,/home/ec2-user/app/application-aws.yml \
    -Dspring.profiles.active=prod,$IDLE_PROFILE \
    $JAR_NAME > $REPOSITORY/prod/nohup.out 2>&1 &
