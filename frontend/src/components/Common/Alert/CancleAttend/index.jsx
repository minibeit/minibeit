import React, { useState } from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../..//svg/경고.svg";
import { toast } from "react-toastify";

export default function CancleAttend({
  setCancleAttend,
  id,
  changeFeedData,
  doNotJoinApi,
}) {
  const [secondAlert, setSecondAlert] = useState(false);

  const doNotJoin = (postDoDateId) => {
    doNotJoinApi(postDoDateId)
      .then(() => {
        setSecondAlert(true);
      })
      .catch((err) => toast.error("취소할 수 없는 실험입니다."));
  };
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
