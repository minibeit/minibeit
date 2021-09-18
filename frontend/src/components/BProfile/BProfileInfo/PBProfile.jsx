import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import PropTypes from "prop-types";
import { userState } from "../../../recoil/userState";
import { deleteBprofile } from "../../../utils/bprofileApi";
import * as S from "../style";
import { useHistory } from "react-router";
import BProfileJoin from "../BProfileJoin";

PBProfile.propTypes = {
  buserData: PropTypes.shape({
    contact: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    introduce: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
};

export default function PBProfile({ buserData }) {
  const history = useHistory();
  const [user, setUser] = useRecoilState(userState);
  const nickname = useRecoilValue(userState).name;
  const [modalSwitch, setModalSwitch] = useState(false);
  const doDelete = async () => {
    await deleteBprofile(buserData.id);
    setUser({ ...user, bpId: 0 });
    alert("삭제되었습니다.");
    window.location.replace("/user/" + nickname);
  };

  return (
    <S.UserInfoContainer>
      <S.BUserInfoContainer1>
        <S.ImgBox>
          {buserData.avatar !== null ? (
            <S.UserImg src={buserData.avatar} />
          ) : (
            <S.UserImg src="/기본비즈니스프로필.jpeg" />
          )}
        </S.ImgBox>
        <S.UserName>이름 : {buserData.name}</S.UserName>
        <S.UserInfo
          onClick={() =>
            window.open("https://map.naver.com/v5/search/" + buserData.place)
          }
        >
          장소 : {buserData.place}
        </S.UserInfo>

        <S.UserInfo>실험실 소개 : {buserData.introduce}</S.UserInfo>
        <S.UserInfo>전화번호 : {buserData.contact}</S.UserInfo>
      </S.BUserInfoContainer1>
      <S.BUserInfoContainer2>
        <S.BProfileEdit
          onClick={() =>
            history.push({
              pathname: `/business/${buserData.id}/edit`,
            })
          }
        >
          수정하기
        </S.BProfileEdit>
        <S.BProfileDelete onClick={doDelete}>삭제하기</S.BProfileDelete>
        <S.BPjoin onClick={() => setModalSwitch(true)}>소속 인원 목록</S.BPjoin>
        {modalSwitch ? (
          <BProfileJoin
            businessId={buserData.id}
            setModalSwitch={setModalSwitch}
          />
        ) : null}
      </S.BUserInfoContainer2>
    </S.UserInfoContainer>
  );
}
