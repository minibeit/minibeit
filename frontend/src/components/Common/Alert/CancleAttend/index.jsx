import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../..//svg/경고.svg";

export default function CancleAttend({
  setCancleAttend,
  secondAlert,
  setSecondAlert,
  doNotJoin,
  id,
  changeFeedData,
}) {
  return (
    <Portal>
      <S.AlertBox>
        {!secondAlert ? (
          <S.AlertContent>
            <InfoIcon />
            <p>실험 참여를 취소하시겠습니까?</p>
            <div>
              <S.GrayButton onClick={() => setCancleAttend(false)}>
                아니오, 관둘래요
              </S.GrayButton>
              <S.BlueButton
                onClick={() => {
                  doNotJoin(id);
                }}
              >
                네, 취소할래요.
              </S.BlueButton>
            </div>
          </S.AlertContent>
        ) : (
          <S.AlertContent>
            <InfoIcon />
            <p>실험이 참여 취소 되었습니다.</p>
            <div>
              <S.BlueButton
                onClick={() => {
                  setCancleAttend(false);
                  setSecondAlert(false);
                  changeFeedData();
                }}
              >
                확인
              </S.BlueButton>
            </div>
          </S.AlertContent>
        )}
      </S.AlertBox>
    </Portal>
  );
}
