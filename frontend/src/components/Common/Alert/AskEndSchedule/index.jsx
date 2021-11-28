import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";

// 일정종료 알림창이 뜨기전 진짜로 일정을 종료할것인지 묻는 알림창

export default function AskEndSchedule({ setEndAlert, deleteFeed, data }) {
  const clickOutside = (e) => {
    e.target === e.currentTarget && setEndAlert(0);
    document.querySelector("body").removeAttribute("style");
  };
  const clickBtn = () => {
    setEndAlert(0);
    document.querySelector("body").removeAttribute("style");
  };

  return (
    <Portal>
      <S.AlertBackground onClick={(e) => clickOutside(e)}>
        <S.AlertBox>
          <S.AlertContent>
            <InfoIcon />
            <p>
              모든 일정이 <span>종료</span>되었나요?
            </p>
            <p>
              일정이 끝나지 않은 상태에서 일정을 종료하시면
              <br />
              해당 일정의 참여자 명단이 사라져요.
            </p>
            <div>
              <S.GrayButton onClick={clickBtn}>아니오, 관둘래요</S.GrayButton>
              <S.BlueButton onClick={() => deleteFeed(data.id)}>
                네, 종료됐어요
              </S.BlueButton>
            </div>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  );
}
