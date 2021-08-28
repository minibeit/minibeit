import React from "react";
import * as S from "../style";

export default function PUserInfo(props) {
  const { userData } = props;
  return (
    <S.UserInfoContainer>
      <S.UserName>이름 : {userData.name}</S.UserName>
      <S.UserInfo>닉네임 : {userData.nickname}</S.UserInfo>
      <S.UserInfo>성별 : {userData.gender}</S.UserInfo>
      <S.UserInfo>나이 : {userData.age}</S.UserInfo>
      <S.UserInfo>직업 : {userData.job}</S.UserInfo>
      <S.UserInfo>전화번호 : {userData.phoneNum}</S.UserInfo>
    </S.UserInfoContainer>
  );
}
