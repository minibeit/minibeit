import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";
// 종료 사유 입력후 모집이 끝났다고 알려주는 알림창

export default function EndRecruting({ setCloseModal, changeFeedData }) {
  return (
    <Portal>
      <S.AlertBox>
        <S.AlertContent>
          <InfoIcon />
          <p>
            해당 모집 공고의
            <br />
            <span>모집이 종료</span>되었어요.
          </p>
          <button
            onClick={() => {
              setCloseModal(0);
              changeFeedData("생성한 모집공고");
            }}
          >
            닫기
          </button>
        </S.AlertContent>
      </S.AlertBox>
    </Portal>
  );
}
