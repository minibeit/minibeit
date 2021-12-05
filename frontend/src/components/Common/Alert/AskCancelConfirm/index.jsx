import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../..//svg/경고.svg";
// 정말로 해당 확정인을 반려할것인지 묻는 알림창

export default function AskCancelConfirm({
  cancleApprove,
  setCancleAlert,
  cancleUserInfo,
}) {
  const clickOutside = (e) => {
    e.target === e.currentTarget && setCancleAlert(false);
    document.querySelector("body").removeAttribute("style");
  };
  const clickBtn = () => {
    setCancleAlert(false);
    document.querySelector("body").removeAttribute("style");
  };

  return (
    <Portal>
      <S.AlertBackground onClick={(e) => clickOutside(e)}>
        <S.AlertBox>
          <S.AlertContent>
            <InfoIcon />
            <p>정말로 해당 확정자를 취소하시겠어요?</p>
            <p>
              갑자기 취소 및 반려를 하신 경우, 확정된 참여자들이 당황스러워하실
              수 있어요.
              <br />
              <span>꼭! 개별 연락을 통해 일정 종료를 알려주시길 바라요.</span>
            </p>
            <div>
              <S.GrayButton onClick={clickBtn}>아니오, 관둘래요</S.GrayButton>
              <S.BlueButton
                onClick={() => {
                  cancleApprove(cancleUserInfo.postDoDateId, cancleUserInfo.id);
                  document.querySelector("body").removeAttribute("style");
                }}
              >
                네, 취소할래요
              </S.BlueButton>
            </div>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  );
}
