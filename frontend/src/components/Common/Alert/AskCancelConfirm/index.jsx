import React from "react";
import Portal from "../Portal";
import * as S from "../style";
import { ReactComponent as InfoIcon } from "../../../..//svg/경고.svg";
import { ReactComponent as XIcon } from "../../../..//svg/엑스.svg";

// 정말로 해당 확정인을 반려할것인지 묻는 알림창

export default function AskCancelConfirm({
  cancleApprove,
  setCancleAlert,
  postDoDateId,
  userId,
}) {
  return (
    <Portal>
      <S.AlertBox>
        <S.AlertHeader>
          <XIcon onClick={() => setCancleAlert(false)} />
        </S.AlertHeader>
        <S.AlertContent>
          <InfoIcon />
          <S.AlertText>
            <p>정말 해당 확정자를 취소하시겠어요?</p>
            <p>
              갑자기 취소 및 반려를 하신 경우,
              <br /> 확정된 참여자들이 당황스러워하실 수 있어요.
            </p>
            <p>
              꼭! 개별 연락을 통해 <br />
              일정 종료를 알려주시길 바라요.
            </p>
          </S.AlertText>
          <S.BtnGroup>
            <S.GrayButton onClick={() => setCancleAlert(false)}>
              아니오, 관둘래요
            </S.GrayButton>
            <S.BlueButton onClick={() => cancleApprove(postDoDateId, userId)}>
              네, 취소할래요
            </S.BlueButton>
          </S.BtnGroup>
        </S.AlertContent>
      </S.AlertBox>
    </Portal>
  );
}
