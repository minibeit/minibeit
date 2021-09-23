import React from "react";
import LikeListBox from "../LikeListBox";
import UserInfo from "../UserInfo";
import { Link } from "react-router-dom";
import * as S from "../style";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import JoinListBox from "../JoinListBox";

export default function PProfileCont() {
  const bpId = useRecoilValue(userState).bpId;
  const link = "/business/" + bpId;
  return (
    <>
      <S.PTabCont>
        <S.ProfileTab1>개인프로필</S.ProfileTab1>
        <Link to={link}>
          {" "}
          <S.ProfileTab2>비즈니스 프로필</S.ProfileTab2>
        </Link>
      </S.PTabCont>
      <S.PTabContent>
        <S.PleftBox>
          <UserInfo />
          <LikeListBox />
        </S.PleftBox>
        <S.PrightBox>
          <JoinListBox state="APPROVE" />
          <JoinListBox state="WAIT" />
          <div>완료 실험 리스트</div>
        </S.PrightBox>
      </S.PTabContent>
    </>
  );
}
