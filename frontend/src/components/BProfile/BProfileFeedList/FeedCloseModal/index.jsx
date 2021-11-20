import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import * as S from "./style";
import Portal from "../../../Common/Modal/Portal";
import { stateCompleteApi } from "../../../../utils";

export default function FeedCloseModal({
  postId,
  setCloseModal,
  closeModal
}) {
  const [comment, setComment] = useState(""); //input에 담긴 코멘트를 담음
  const [items] = useState(['죄송하지만, 급한 다른 일정이 생겼어요.', '죄송하지만, 참여자 모집이 원활하지 않아요.','죄송하지만, 상세 내용을 다시 변경하여 공고를 올려야해요.','죄송하지만, 행정 및 법률상 문제가 발생했어요.','죄송하지만, 참여자 명단을 확정했어요.','참여자들의 일정을 완료하고 보상을 지급했어요.','직접입력'])
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('사유를 골라주세요.');
 
  const selectReason=(e) => {
    setSelected(`${e.target.value}`);
    if(e.target.value === "직접입력") {
      setIsActive(!isActive);
    } else {
      setIsActive(!isActive);
    };
  };

  const stateComplete = (postId, rejectComment) => {
    if (closeModal===1) {
      stateCompleteApi(postId, rejectComment)
        .then(() => {   
          setCloseModal(2);
        })
        .catch((err) => alert("종료할 수 없는 게시물 입니다"));
    }
  };

  const onSubmit = () => {
    if (selected === "직접입력") {
      if (comment === "") {
        alert("종료사유를 입력하세요");
      } else {
        stateComplete(postId, comment);
      }
    } else { 
      if(selected ==='사유를 골라주세요.') {
        alert("종료사유를 골라주세요.");
      } else {
        stateComplete(postId, selected);
      }
    }
  };

  return (
    <Portal>
      <S.ModalBackground onClick={(e)=>e.target===e.currentTarget && setCloseModal(0)}>
        <S.ModalBox>
          <div>
            <CloseIcon sx={{ fontSize: 20}} onClick={() => {setCloseModal(0)}}/>
          </div>
          <S.ModalContent>
              <InfoOutlinedIcon sx={{ fontSize: 40}}/>
              <p>종료 사유를 알려주세요</p>
              <div>
                <S.Select onClick={()=>setIsActive(!isActive)} 
                isActive={isActive}>{selected}
                <span onClick={()=>setIsActive(!isActive)}>▲</span>
                </S.Select>
                <div>
                  {isActive && (items.map((a,i) => 
                  (<S.Option onClick={selectReason} value={a} key={i}>{a}</S.Option>)))}
                </div>
              </div>
                {selected === "직접입력" && (
                  <S.Input
                  value={comment}
                  type="text"
                  placeholder="직접입력"
                  onChange={(e) => setComment(e.target.value)}
                  />
                )}
            <S.BlueButton onClick={() => onSubmit()}>확인</S.BlueButton>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
