import React, { useState } from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";
import { toast } from "react-toastify";

// 일정종료 알림창이 뜨기전 진짜로 일정을 종료할것인지 묻는 알림창

export default function AskEndSchedule({
  setEndAlert,
  data,
  feedDeleteApi,
  changeFeedData,
}) {
  const [secondAlert, setSecondAlert] = useState(false);
  const deleteFeed = async (id) => {
    await feedDeleteApi(id)
      .then(() => {
        setSecondAlert(true); // changeFeedData("완료된 모집공고");
      })
      .catch(() => {
        toast.error(
          "삭제할 수 없는 게시물입니다. 확정자가 있는지 확인해주세요."
        );
        setEndAlert(false);
      });
  };
  return (
    <Portal>
      {!secondAlert ? (
        <S.AlertBox>
          <S.AlertContent>
            <InfoIcon />
            <p>
              모든 일정이 <span>종료</span>되었나요?
            </p>
            <p>
              일정이 끝나지 않은 상태에서 일정을 종료하시면
              <br />
              해당 일정의 참여자 명단이 사라져요.
            </p>
            <div>
              <S.GrayButton onClick={() => setEndAlert(0)}>
                아니오, 관둘래요
              </S.GrayButton>
              <S.BlueButton onClick={() => deleteFeed(data.id)}>
                네, 종료됐어요
              </S.BlueButton>
            </div>
          </S.AlertContent>
        </S.AlertBox>
      ) : (
        <S.AlertBox>
          <S.AlertContent>
            <InfoIcon />
            <p>
              해당 모집 공고의
              <br />
              <span>일정이 종료</span>되었어요.
            </p>
            <S.BlueButton
              onClick={() => {
                setEndAlert(false);
                changeFeedData("완료된 모집공고");
              }}
            >
              닫기
            </S.BlueButton>
          </S.AlertContent>
        </S.AlertBox>
      )}
    </Portal>
  );
}
