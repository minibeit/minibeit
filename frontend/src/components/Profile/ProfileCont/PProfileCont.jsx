import React, { useState } from "react";
import LikeListBox from "../LikeListBox";
import UserInfo from "../UserInfo";
import { Link } from "react-router-dom";
import * as S from "../style";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import JoinListBox from "../JoinListBox";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";

export default function PProfileCont() {
  const bpId = useRecoilValue(userState).bpId;
  const link = "/business/" + bpId;
  const [tabIndex, setTabIndex] = useState(1);
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
        </S.PleftBox>
        <S.PrightBox>
          <S.PrightTopBox>
            <S.PrightTab>
              <S.PrightTabele tabIndex={tabIndex} index={1}>
                <p onClick={() => setTabIndex(1)}>대기중 목록</p>
              </S.PrightTabele>
              <S.PrightTabele tabIndex={tabIndex} index={2}>
                <p onClick={() => setTabIndex(2)}>확정된 목록</p>
              </S.PrightTabele>
              <S.PrightTabele tabIndex={tabIndex} index={3}>
                <p onClick={() => setTabIndex(3)}>완료한 목록</p>
              </S.PrightTabele>
              <S.PrightTabele tabIndex={tabIndex} index={4}>
                <p onClick={() => setTabIndex(4)}>반려된 목록</p>
              </S.PrightTabele>
            </S.PrightTab>
            <S.PFavorite>
              {tabIndex === 5 ? (
                <StarIcon />
              ) : (
                <StarOutlineIcon onClick={() => setTabIndex(5)} />
              )}
            </S.PFavorite>
          </S.PrightTopBox>

          {tabIndex === 1 ? (
            <JoinListBox state="WAIT" />
          ) : tabIndex === 2 ? (
            <JoinListBox state="APPROVE" />
          ) : tabIndex === 3 ? (
            <div>완료 실험 리스트</div>
          ) : tabIndex === 4 ? (
            <JoinListBox state="CANCEL" />
          ) : tabIndex === 5 ? (
            <LikeListBox />
          ) : null}
        </S.PrightBox>
      </S.PTabContent>
    </>
  );
}
