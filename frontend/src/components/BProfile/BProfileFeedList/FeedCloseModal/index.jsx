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
  const [option, setOption] = useState();
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

  const onSubmit = () => {
    if (option === "직접입력") {
      if (comment === "") {
        alert("삭제사유를 입력하세요");
      } else {
        stateComplete(postId, comment);
      }
    } else {
      stateComplete(postId, option);
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
              <select
                onChange={(e) => setOption(e.target.value)}
                defaultValue={"DEFAULT"}
              >
                <option key={0}>참여자 모집이 원활하지 않음</option>
                <option key={1}>실험하기 귀찮음</option>
                <option key={2}>참여자 모집이 원활하지 않음</option>
                <option key={3}>실험하기 귀찮음</option>
                <option key={4}>참여자 모집이 원활하지 않음</option>
                <option key={5}>직접입력</option>
              </select>
              {option === "직접입력" ? (
                <input
                  value={comment}
                  type="text"
                  placeholder="직접입력"
                  onChange={(e) => setComment(e.target.value)}
                />
              ) : null}
            </S.Content>

            <button onClick={() => onSubmit()}>확인</button>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
