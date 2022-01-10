import React from "react";
import Portal from "../Portal";
import * as S from "../style";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";
import { ReactComponent as XIcon } from "../../../..//svg/엑스.svg";

// 게시글 삭제 권한이없음을 알려주는 알림창
// 아직 안씀

export default function NoAuthority({ setAlertSwitch }) {
  return (
    <Portal>
      <S.AlertBox>
        <S.AlertHeader>
          <XIcon onClick={() => setAlertSwitch(false)} />
        </S.AlertHeader>
        <S.AlertContent>
          <InfoIcon />
          <S.AlertText>
            <p>
              회원님께서는
              <br />
              삭제하실 수 있는 권한이 없습니다.
            </p>
          </S.AlertText>
          <S.BtnGroupA>
            <S.BlueButton onClick={() => setAlertSwitch(false)}>
              네, 알겠어요
            </S.BlueButton>
          </S.BtnGroupA>
        </S.AlertContent>
      </S.AlertBox>
    </Portal>
  );
}
