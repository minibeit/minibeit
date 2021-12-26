import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";

// 실험을 정말 삭제할것인지 묻는 알림창

export default function DeleteFeed({ setAlertSwitch }) {
  return (
    <Portal>
      <S.AlertBox>
        <S.AlertContent>
          <InfoIcon />
          <p>
            <span>코로나로 인한 대학생 우울증실험</span>을<br />
            정말로 <span>삭제</span>하시겠습니까?
          </p>
          <div>
            <S.GrayButton onClick={() => setAlertSwitch(false)}>
              아니오, 관둘래요
            </S.GrayButton>
            <S.BlueButton>네, 삭제할래요</S.BlueButton>
          </div>
        </S.AlertContent>
      </S.AlertBox>
    </Portal>
  );
}
