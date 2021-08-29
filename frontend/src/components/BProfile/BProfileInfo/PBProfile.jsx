import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { deleteBprofile } from "../../../utils/bprofileApi";
import * as S from "../style";

export default function PBProfile(props) {
  const nickname = useRecoilValue(userState).name;
  const { buserData, businessId } = props;
  const doDelete = async () => {
    await deleteBprofile(businessId);
    alert("삭제되었습니다.");
    window.location.replace("/user/" + nickname);
  };
  return (
    <S.UserInfoContainer>
      <S.BUserInfoContainer1>
        {" "}
        <S.UserName>이름 : {buserData.name}</S.UserName>
        <S.UserInfo>카테고리 : {buserData.category}</S.UserInfo>
        <S.UserInfo>장소 : {buserData.place}</S.UserInfo>
        <S.UserInfo>실험실 소개 : {buserData.introduce}</S.UserInfo>
        <S.UserInfo>전화번호 : {buserData.contact}</S.UserInfo>
      </S.BUserInfoContainer1>
      <S.BUserInfoContainer2>
        <S.BProfileEdit
          onClick={() =>
            window.location.replace(`/business/${businessId}/edit`)
          }
        >
          수정하기
        </S.BProfileEdit>
        <S.BProfileDelete onClick={doDelete}>삭제하기</S.BProfileDelete>
      </S.BUserInfoContainer2>
    </S.UserInfoContainer>
  );
}
