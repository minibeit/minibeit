import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import * as S from "./style";
import Portal from "../../Common/Modal/Portal";

export default function BCompleteModal({ stateComplete, setModalSwitch2 }) {
  const closeModal = () => {
    setModalSwitch2(false);
  };
  const [rejectComment, setRejectComment] = useState();
  const [rejectSelfComment, setRejectSelfComment] = useState();
  const onChange = (e) => {
    setRejectComment(e.target.value);
  };
  const onChange2 = (e) => {
    setRejectSelfComment(e.target.value);
  };
  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <S.CloseModalBtn onClick={closeModal}>
              <CloseIcon />
            </S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <S.BCCont>
              <InfoOutlinedIcon />
            </S.BCCont>
            <S.BCCont>
              <p>삭제 사유를 알려주세요</p>
            </S.BCCont>
            <S.BCCont>
              <S.BCSelect
                onChange={onChange}
                defaultValue={"DEFAULT"}
                name="gender"
              >
                <option value="참여자 모집이 원활하지 않음" key={0}>
                  참여자 모집이 원활하지 않음
                </option>
                <option value="실험하기 귀찮음" key={1}>
                  실험하기 귀찮음
                </option>
                <option value="참여자 모집이 원활하지 않음" key={2}>
                  참여자 모집이 원활하지 않음
                </option>
                <option value="실험하기 귀찮음" key={3}>
                  실험하기 귀찮음
                </option>
                <option value="참여자 모집이 원활하지 않음" key={4}>
                  참여자 모집이 원활하지 않음
                </option>
                <option value="직접입력" key={5}>
                  직접입력
                </option>
              </S.BCSelect>
            </S.BCCont>
            {rejectComment === "직접입력" ? (
              <S.BCInput
                value={rejectSelfComment}
                type="text"
                placeholder="직접입력"
                onChange={onChange2}
              />
            ) : null}
            <S.BCCont2>
              <p
                onClick={async (e) => {
                  e.preventDefault();
                  if (rejectComment === "직접입력") {
                    if (rejectSelfComment === "") {
                      window.alert("삭제사유를 입력하세요");
                    } else {
                      await stateComplete(rejectSelfComment);
                    }
                  } else {
                    await stateComplete(rejectComment);
                  }
                }}
              >
                확인
              </p>
            </S.BCCont2>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
