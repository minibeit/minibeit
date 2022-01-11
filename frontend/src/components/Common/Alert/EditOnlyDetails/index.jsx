import React from "react";
import Portal from "../Portal";
import * as S from "../style";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";
import { ReactComponent as XIcon } from "../../../..//svg/엑스.svg";

// 상세내용만 수정이 가능하다고 알려주는 알림창

export default function EditOnlyDetails({ setEditAlert, setEditSwitch }) {
  return (
    <Portal>
      <S.AlertBox>
        <S.AlertHeader>
          <XIcon onClick={() => setEditAlert(false)} />
        </S.AlertHeader>
        <S.AlertContent>
          <InfoIcon />
          <S.AlertText>
            <p>상세내용 수정만 가능합니다.</p>
            <p>제목, 시간, 조건, 지급, 장소 등은 수정이 불가합니다.</p>
          </S.AlertText>
          <S.BtnGroup>
            <S.BlueButton
              onClick={() => {
                setEditAlert(false);
                setEditSwitch(true);
              }}
            >
              네, 알겠어요.
            </S.BlueButton>
          </S.BtnGroup>
        </S.AlertContent>
      </S.AlertBox>
    </Portal>
  );
}
