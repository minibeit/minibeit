import React, { useState } from "react";
import * as S from "../style";
import PropTypes from "prop-types";
import ProfileEditModal from "./ProfileEditModal";

Presenter.propTypes = {
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

export default function Presenter({ userData }) {
  const [modalSwitch, setModalSwitch] = useState(false);
  return (
    <S.UserInfoContainer>
      <S.ImgBox>
        {userData.avatar !== null ? (
          <S.UserImg src={userData.avatar} />
        ) : (
          <S.UserImg src="/기본프로필.png" />
        )}
      </S.ImgBox>
      <S.UserEditBtn onClick={() => setModalSwitch(true)}>
        수정하기
      </S.UserEditBtn>
      {modalSwitch ? (
        <ProfileEditModal setModalSwitch={setModalSwitch} />
      ) : null}

      <S.UserInfoBox>
        <S.UserInfo>
          <p>이름</p>
          <p>{userData.name}</p>
        </S.UserInfo>
        <S.UserInfo>
          <p>닉네임 </p>
          <p>{userData.nickname}</p>
        </S.UserInfo>
        <S.UserInfo>
          <p>성별</p>
          <p>
            {userData.gender === "FEMALE"
              ? "여자"
              : userData.gender === "MALE"
              ? "남자"
              : null}
          </p>
        </S.UserInfo>
        <S.UserInfo>
          <p>생년월일</p>
          <p>{userData.birth}</p>
        </S.UserInfo>
        <S.UserInfo>
          <p>관심학교 </p>
          <p>{userData.schoolName}</p>
        </S.UserInfo>
        <S.UserInfo>
          <p>직업</p>
          <p>{userData.job}</p>
        </S.UserInfo>
        <S.UserInfo>
          <p>전화번호</p>
          <p>{userData.phoneNum}</p>
        </S.UserInfo>
      </S.UserInfoBox>
    </S.UserInfoContainer>
  );
}
