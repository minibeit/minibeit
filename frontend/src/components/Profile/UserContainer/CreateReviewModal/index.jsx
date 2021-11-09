import React from "react";
import Portal from "../../../Common/Modal/Portal";
import CloseIcon from "@mui/icons-material/Close";

import * as S from "./style";

export default function CreateReviewModal({ data, setModalSwitch }) {
  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <S.CloseModalBtn>
              <CloseIcon onClick={() => setModalSwitch(false)} />
            </S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <div>
              <S.TitleBox>
                <p>게시글 제목</p>
                <p>{data.title}</p>
              </S.TitleBox>
              <S.TextInput type="textarea" />
            </div>
            <div>
              <S.DateTime>
                <div>
                  <p>참여 날짜</p>
                  <p>{data.doDate}</p>
                </div>
                <div>
                  <p>참여 시간</p>
                  <p>
                    {data.startTime}-{data.endTime}
                  </p>
                </div>
              </S.DateTime>
              <S.ReviewBtn>
                <button>다음에 작성하기</button>
                <button>작성 완료</button>
              </S.ReviewBtn>
            </div>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
