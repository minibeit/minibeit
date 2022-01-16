import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";

// 정말로 반려할것인지 물어보는 알림창

export default function RejectApplicant({
  setRejectAlert,
  rejectApply,
  userName,
  postDoDateId,
  userId,
  reason,
  setReason,
}) {
  return (
    <Portal>
      <S.AlertBox>
        <S.AlertContent>
          <InfoIcon />
          <p>
            <span>{userName}님</span>을<br />
            정말로 <span>반려</span>하시겠습니까?
          </p>
          <div>
            <S.GrayButton
              onClick={() => {
                setRejectAlert(false);
                setReason("");
              }}
            >
              아니오, 관둘래요
            </S.GrayButton>
            <S.BlueButton
              onClick={() => rejectApply(postDoDateId, userId, reason)}
            >
              네, 반려할래요
            </S.BlueButton>
          </div>
        </S.AlertContent>
      </S.AlertBox>
    </Portal>
  );
}
