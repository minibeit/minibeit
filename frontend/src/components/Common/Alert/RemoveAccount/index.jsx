import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";

// 탈퇴하기

export default function RemoveAccount({ setAlertSwitch }) {
  return (
    <Portal>
      <S.AlertBackground>
        <S.AlertBox>
          <S.AlertContent>
            <InfoIcon />
            <p>
              회원이 아니면 사람들을 모집 할 수 없고,
              <br />
              다양한 구인 공고에 참여할 수 없어요.
              <br />
              <span>정말로 탈퇴하시겠어요?</span>
            </p>
            <div>
              <S.GrayButton onClick={() => setAlertSwitch(false)}>
                아니오, 관둘래요
              </S.GrayButton>
              <S.BlueButton>네, 탈퇴할래요</S.BlueButton>
            </div>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  );
}
