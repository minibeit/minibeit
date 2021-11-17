import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import * as S from "./style";
import Portal from "../../../Common/Modal/Portal";
import { stateCompleteApi } from "../../../../utils";

export default function FeedCloseModal({
  postId,
  setModalSwitch,
  changeFeedData,
}) {
  const [comment, setComment] = useState("");

  const stateComplete = (postId, rejectComment) => {
    let value = window.confirm("게시물을 삭제하시겠습니까?");
    if (value) {
      stateCompleteApi(postId, rejectComment)
        .then(() => {
          alert("게시물이 삭제되었습니다");
          changeFeedData("생성한 모집공고");
        })
        .catch((err) => alert("삭제할 수 없는 게시물 입니다"));
    }
  };
  const [items] = useState(['죄송하지만, 급한 다른 일정이 생겼어요.', '죄송하지만, 참여자 모집이 원활하지 않아요.','죄송하지만, 상세 내용을 다시 변경하여 공고를 올려야해요.','죄송하지만, 행정 및 법률상 문제가 발생했어요.','죄송하지만, 참여자 명단을 확정했어요.','참여자들의 일정을 완료하고 보상을 지급했어요.','직접입력'])
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('사유를 골라주세요.');

  const active = () => {
    setIsActive(!isActive);
  };
 
  const selectReason=(e) => {
    setSelected(`${e.target.value}`);
    if(e.target.value === "직접입력") {
      setIsActive(!isActive);
    } else {
      setIsActive(!isActive);
    };
  };


  const onSubmit = () => {
    if (selected === "직접입력") {
      if (comment === "") {
        alert("삭제사유를 입력하세요");
      } else {
        stateComplete(postId, comment);
      }
    } else {
      stateComplete(postId, selected);
    }
  };

  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <S.CloseModalBtn onClick={() => setModalSwitch(false)}>
              <CloseIcon />
            </S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <S.ContentHeader>
              <InfoOutlinedIcon />
              <p>삭제 사유를 알려주세요</p>
            </S.ContentHeader>
            <S.Content>
                <S.Select onClick={active} isActive={isActive}>{selected}<span onClick={active}>▲</span></S.Select>
              <div>{isActive && (items.map((a,i) => (<S.Option onClick={selectReason} value={a} key={i}>{a}</S.Option>)))}</div>
              {selected === "직접입력" && (
                <S.Input
                  value={comment}
                  type="text"
                  placeholder="직접입력"
                  onChange={(e) => setComment(e.target.value)}
                />
              )}
            </S.Content>
            <button onClick={() => onSubmit()}>확인</button>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
