import React from "react";
import { useRecoilValue } from "recoil";
import PropTypes from "prop-types";
import { userState } from "../../../recoil/userState";
import { deleteBprofile } from "../../../utils/bprofileApi";
import * as S from "../style";
import { useHistory } from "react-router";
import BProfileJoin from "../BProfileJoin";

PBProfile.propTypes = {
  buserData: PropTypes.shape({
    category: PropTypes.string.isRequired,
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
  const nickname = useRecoilValue(userState).name;
  const doDelete = async () => {
    await deleteBprofile(buserData.id);
    alert("삭제되었습니다.");
    window.location.replace("/user/" + nickname);
  };

  return (
    <S.UserInfoContainer>
      <S.BUserInfoContainer1>
        {" "}
        {buserData.avatar !== null ? (
          <S.UserImg src={buserData.avatar} />
        ) : null}
        <S.UserName>이름 : {buserData.name}</S.UserName>
        <S.UserInfo>카테고리 : {buserData.category}</S.UserInfo>
        <S.UserInfo>장소 : {buserData.place}</S.UserInfo>
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
        <BProfileJoin businessId={buserData.id} />
      </S.BUserInfoContainer2>
    </S.UserInfoContainer>
  );
}
