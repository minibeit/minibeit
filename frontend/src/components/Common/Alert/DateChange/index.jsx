import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";

// 날짜변경시 설정한 정보가 변경되는것을 알려주는

export default function DateChange({ setResetAlert, setCreatedGroup }) {
  return (
    <Portal>
      <S.AlertBox>
        <S.AlertContent>
          <InfoIcon sx={{ fontSize: 40, color: "#0642FF" }} />
          <p>
            시간을 변경하면 시간선택 그룹이 초기화돼요!
            <br />
            <span>정말로 변경하시겠어요?</span>
          </p>
          <div>
            <S.GrayButton onClick={() => setResetAlert(false)}>
              아니오, 돌아갈래요
            </S.GrayButton>
            <S.BlueButton
              onClick={() => {
                setResetAlert(false);
                setCreatedGroup([]);
              }}
            >
              네, 변경할래요
            </S.BlueButton>
          </div>
        </S.AlertContent>
      </S.AlertBox>
    </Portal>
  );
}
