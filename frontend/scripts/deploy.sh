#!/bin/bash

REPOSITORY=/home/ec2-user/app/dev

echo "> zip 파일 복사 "

sudo cp -r $REPOSITORY/front-end-zip/build /var/www/html

