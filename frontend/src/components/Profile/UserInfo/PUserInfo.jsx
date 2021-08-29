import React from "react";
import * as S from "../style";
import PropTypes from "prop-types";

PUserInfo.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    job: PropTypes.string.isRequired,
    phoneNum: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
};

export default function PUserInfo({ userData }) {
  return (
    <S.UserInfoContainer>
      {userData.avatar !== null ? <S.UserImg src={userData.avatar} /> : null}
      <S.UserName>이름 : {userData.name}</S.UserName>
      <S.UserInfo>닉네임 : {userData.nickname}</S.UserInfo>
      <S.UserInfo>성별 : {userData.gender}</S.UserInfo>
      <S.UserInfo>나이 : {userData.age}</S.UserInfo>
      <S.UserInfo>직업 : {userData.job}</S.UserInfo>
      <S.UserInfo>전화번호 : {userData.phoneNum}</S.UserInfo>
    </S.UserInfoContainer>
  );
}
