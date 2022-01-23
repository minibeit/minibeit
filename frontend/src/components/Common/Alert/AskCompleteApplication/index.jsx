import React, { useState } from "react";
import Portal from "../Portal";
import * as S from "../style";
import { useHistory } from "react-router";
import toast from "react-hot-toast";
import { ReactComponent as XIcon } from "../../../..//svg/엑스.svg";

//신청을 완료할것인지 묻는 알림창

export default function AskleteApplication({ setApplyAlert, apply, applyApi }) {
  const history = useHistory();

  const doMonth = apply.doDate.substring(5, 7);
  const doDay = apply.doDate.substring(8);
  const time = apply.doTime.substring(0, 2);
  const min = apply.doTime.substring(3, 5);

  const [secondAlert, setSecondAlert] = useState(false);

  const submit = async (postDoDateId) => {
    applyApi(postDoDateId)
      .then((res) => {
        setSecondAlert(true);
      })
      .catch((err) => {
        toast.error("지원이 실패하였습니다");
        setApplyAlert(false);
        //   신청한 실험일 때, 날짜를 고르지 않았을 때 에러 추가해야함
      });
  };

  return (
    <Portal>
      <S.AlertBox>
        <S.AlertHeader>
          <XIcon onClick={() => setApplyAlert(false)} />
        </S.AlertHeader>
        {!secondAlert ? (
          <S.AlertContent>
            <S.AlertText>
              <p>
                {doMonth}월 {doDay}일, {time > 12 ? "오후" : "오전"}
                {time > 12 ? time - 12 : time}시{" "}
                {min !== "00" ? `${min}분` : null}
                <br />
                참여를 신청하시겠습니까?
              </p>
              <p>날짜, 시간, 장소를 꼭 확인해주세요.</p>
            </S.AlertText>
            <S.BtnGroup>
              <S.GrayButton onClick={() => setApplyAlert(false)}>
                아니오
              </S.GrayButton>
              <S.BlueButton onClick={() => submit(apply.postDoDateId)}>
                신청
              </S.BlueButton>
            </S.BtnGroup>
          </S.AlertContent>
        ) : (
          <S.AlertContent>
            <S.AlertText>
              <p>신청이 완료되었습니다.</p>
              <p>
                신청과 관련된 알림은 등록된 메일로 발송돼요.
                <br />
                추후 이메일이나 개인 프로필의 확정된 목록을 통해
                <br />
                참여 확정을 확인해주세요.
              </p>
            </S.AlertText>
            <S.BtnGroup>
              <S.GrayButton
                onClick={() => {
                  history.push("/");
                }}
              >
                홈으로 가기
              </S.GrayButton>
              <S.BlueButton
                onClick={() => {
                  history.push("/profile?wait&1");
                }}
              >
                신청내역 확인하기
              </S.BlueButton>
            </S.BtnGroup>
          </S.AlertContent>
        )}
      </S.AlertBox>
    </Portal>
  );
}
