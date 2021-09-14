import React from "react";
import { useHistory } from "react-router";
import * as S from "../style";
import PropTypes from "prop-types";

PUserInfo.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    birth: PropTypes.string.isRequired,
    job: PropTypes.string.isRequired,
    phoneNum: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
};

export default function PUserInfo({ userData }) {
  const history = useHistory();
  return (
    <S.UserInfoContainer>
      <S.ImgBox>
        {userData.avatar !== null ? (
          <S.UserImg src={userData.avatar} />
        ) : (
          <S.UserImg src="/기본프로필.png" />
        )}
      </S.ImgBox>
      <br />
      <button
        onClick={() => {
          history.push(`/user/${userData.id}/edit`);
        }}
      >
        프로필 수정
      </button>
      <S.UserName>이름 : {userData.name}</S.UserName>
      <S.UserInfo>닉네임 : {userData.nickname}</S.UserInfo>
      <S.UserInfo>
        성별 :{" "}
        {userData.gender === "FEMALE"
          ? "여자"
          : userData.gender === "MALE"
          ? "남자"
          : null}
      </S.UserInfo>
      <S.UserInfo>생년월일 : {userData.birth}</S.UserInfo>
      <S.UserInfo>직업 : {userData.job}</S.UserInfo>
      <S.UserInfo>전화번호 : {userData.phoneNum}</S.UserInfo>
      <S.UserInfo>관심학교 : {userData.schoolName}</S.UserInfo>
    </S.UserInfoContainer>
  );
}
