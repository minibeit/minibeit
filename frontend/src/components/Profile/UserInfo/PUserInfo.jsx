import React from "react";
import * as S from "../style";

export default function PUserInfo(props) {
  const { dummyData } = props;
  return (
    <S.UserInfoContainer>
      <S.UserName>이름 : {dummyData.name}</S.UserName>
      <S.UserInfo>닉네임 : {dummyData.nickname}</S.UserInfo>
      <S.UserInfo>성별 : {dummyData.gender}</S.UserInfo>
      <S.UserInfo>나이 : {dummyData.age}</S.UserInfo>
      <S.UserInfo>직업 : {dummyData.job}</S.UserInfo>
      <S.UserInfo>전화번호 : {dummyData.phoneNum}</S.UserInfo>
    </S.UserInfoContainer>
  );
}
