import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


// 일정종료 알림창이 뜨기전 진짜로 일정을 종료할것인지 묻는 알림창
// endschedule 과 연결돼있기 때문에 스테이트안에 숫자를 넣었음 사용할곳에서 아래처럼 사용해야됌
// {alertSwitch===1 ? <AskEndSchedule setAlertSwitch={setAlertSwitch}/>:null}
// {alertSwitch===2 ? <EndSchedule setAlertSwitch={setAlertSwitch}/>:null}

export default function AskEndSchedule({setAlertSwitch}) {
  const closeAlert = () => {
    setAlertSwitch(0);
  };

 
  const onClick2 = () => {
    setAlertSwitch(2);
  };

  return (
    <Portal>
      <S.AlertBackground>
        <S.AlertBox>
          <S.AlertContent>
            <ErrorOutlineIcon  sx={{ fontSize: 40 , color: "#0642FF"}} />
            <p>모든 일정이 <span>종료</span>되었나요?</p>
            <p>일정이 끝나지 않은 상태에서 일정을 종료하시면<br/>
            해당 일정의 참여자 명단이 사라져요.</p>
            <div>
            <S.GrayButton onClick={closeAlert}>아니오, 관둘래요</S.GrayButton>
            <S.BlueButton onClick={onClick2}>네, 종료됐어요</S.BlueButton>
            </div>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  )}