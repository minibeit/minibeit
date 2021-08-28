import React from "react";
import * as S from "../style";
import PropTypes from "prop-types";

PUserInfo.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    nickname: PropTypes.string,
    gender: PropTypes.string,
    age: PropTypes.number,
    job: PropTypes.string,
    phoneNum: PropTypes.string,
  }),
};

export default function PUserInfo({ userData }) {
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
