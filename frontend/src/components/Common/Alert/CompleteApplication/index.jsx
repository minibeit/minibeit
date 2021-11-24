import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { useHistory } from "react-router";

//신청을 완료했음을 알려주는 알림창

export default function CompleteApplication({ user, setApplyAlert }) {
  const clickOutside = (e) => {
    e.target === e.currentTarget && setApplyAlert(0);
    document.querySelector("body").removeAttribute("style");
  };
  const history = useHistory();

  return (
    <Portal>
      <S.AlertBackground onClick={(e) => clickOutside(e)}>
        <S.AlertBox>
          <S.AlertContent>
            <p>신청이 완료되었습니다.</p>
            <p>
              추후 개인 프로필의 확정된 목록을 통해
              <br />
              참여 확정을 확인해주세요.
            </p>
            <div>
              <S.GrayButton
                onClick={() => {
                  history.push("/");
                }}
              >
                홈으로 가기
              </S.GrayButton>
              <S.BlueButton
                onClick={() => {
                  history.push("/profile/wait");
                }}
              >
                신청내역 확인하기
              </S.BlueButton>
            </div>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  );
}
