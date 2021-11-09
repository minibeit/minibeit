import React, {useState} from "react";
import Portal from "../Portal";
import * as S from "./style";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';



// 종료사유가 뭔지 물어보는 알림창

export default function AskEndReason ({setAlertSwitch}) {
  const closeAlert = () => {
    setAlertSwitch(false);
  };
  const [items] = useState(['죄송하지만, 급한 다른 일정이 생겼어요.', '죄송하지만, 참여자 모집이 원활하지 않아요.','죄송하지만, 상세 내용을 다시 변경하여 공고를 올려야해요.','죄송하지만, 행정 및 법률상 문제가 발생했어요.','죄송하지만, 참여자 명단을 확정했어요.','참여자들의 일정을 완료하고 보상을 지급했어요.','직접입력'])
  const [input, setInput] = useState(false);

  const handleSelect=(e) => {
    if(e.target.value !== "6") {
      setInput(false);
    } else {setInput(true)};
  };

  const [inputValue, setInputValue] = useState('');
  const handleSelect2 = (e) => {
    setInputValue(e.target.value);
  } 
  const onClick = () => {
    console.log(inputValue);
  };

  return (
    <Portal>
      <S.AlertBackground>
        <S.AlertBox>
          <div onClick={closeAlert}>×</div> 
          <S.AlertContent>
          <ErrorOutlineIcon  sx={{ fontSize: 40}} />
            <p>종료 사유를 알려주세요</p>
            <S.Select className="reason" onChange={handleSelect}>
              {items.map((a, i) => (
                <option value={i} key={i}>{a}</option>
              ))}
            </S.Select>
            {input ? (<S.Input type="text" value={inputValue} onChange={handleSelect2}/>) : null}
            <S.BlueButton onClick={onClick} >확인</S.BlueButton>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  )}