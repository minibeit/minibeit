import React, { useState } from "react";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import * as S from "./style";
import Portal from "../../Common/Modal/Portal";

export default function BCompleteModal({ stateComplete, setModalSwitch2 }) {
  const closeModal = () => {
    setModalSwitch2(false);
  };
  const [rejectComment, setRejectComment] = useState();
  const onChange = (e) => {
    setRejectComment(e.target.value);
  };
  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <S.CloseModalBtn onClick={closeModal}>닫기</S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <S.BCCont>
              <InfoOutlinedIcon />
            </S.BCCont>
            <S.BCCont>
              <p>사유를 알려주세요</p>
            </S.BCCont>
            <S.BCCont>
              <S.BCSelect
                onChange={onChange}
                defaultValue={"DEFAULT"}
                name="gender"
              >
                <option value="DEFAULT" disabled>
                  반려사유
                </option>
                <option value="참여자 모집이 원활하지 않음" key={0}>
                  참여자 모집이 원활하지 않음
                </option>
                <option value="실험하기 귀찮음" key={1}>
                  실험하기 귀찮음
                </option>
              </S.BCSelect>
            </S.BCCont>
            <S.BCCont>
              <p
                onClick={async (e) => {
                  e.preventDefault();
                  await stateComplete(rejectComment);
                }}
              >
                확인
              </p>
            </S.BCCont>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
