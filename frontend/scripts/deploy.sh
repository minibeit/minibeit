#!/bin/bash

REPOSITORY=/home/ec2-user/app

echo "> zip 파일 복사 "

sudo yes | cp -rf $REPOSITORY/frontend-zip/build /var/www/html