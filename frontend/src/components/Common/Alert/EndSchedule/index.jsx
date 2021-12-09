import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";

// 일정이 끝났다고 알려주는 알림창

export default function EndSchedule({ setEndAlert, changeFeedData }) {
  return (
    <Portal>
      <S.AlertBackground
        onClick={(e) => e.target === e.currentTarget && setEndAlert(0)}
      >
        <S.AlertBox>
          <S.AlertContent>
            <InfoIcon />
            <p>
              해당 모집 공고의
              <br />
              <span>일정이 종료</span>되었어요.
            </p>
            <button
              onClick={() => {
                setEndAlert(0);
                changeFeedData("완료된 모집공고");
              }}
            >
              닫기
            </button>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  );
}
