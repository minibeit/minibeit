import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";

// 날짜변경시 설정한 정보가 변경되는것을 알려주는

export default function DateChange({ setResetAlert, setResetAgree }) {
  const clickOutside = (e) => {
    e.target === e.currentTarget && setResetAlert(false);
    document.querySelector("body").removeAttribute("style");
  };
  const closeBtn = () => {
    setResetAlert(false);
    document.querySelector("body").removeAttribute("style");
  };
  const okBtn = () => {
    setResetAlert(false);
    setResetAgree(true);
    document.querySelector("body").removeAttribute("style");
  };
  return (
    <Portal>
      <S.AlertBackground onClick={(e) => clickOutside(e)}>
        <S.AlertBox>
          <S.AlertContent>
            <InfoIcon sx={{ fontSize: 40, color: "#0642FF" }} />
            <p>
              날짜, 시간을 변경하면 시간선택 그룹이 초기화돼요!
              <br />
              <span>정말로 날짜를 변경하시겠어요?</span>
            </p>
            <div>
              <S.GrayButton onClick={closeBtn}>아니오, 돌아갈래요</S.GrayButton>
              <S.BlueButton onClick={okBtn}>네, 날짜를 변경할래요</S.BlueButton>
            </div>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  );
}
