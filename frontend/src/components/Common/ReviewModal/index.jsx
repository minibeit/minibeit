import React from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { reviewNewApi } from "../../../utils";
import Portal from "../Modal/Portal";

import * as S from "./style";

export default function ReviewModal({ setModalSwitch, postInfo, state }) {
  const userName = useRecoilValue(userState).name;
  const closeModal = () => {
    setModalSwitch(false);
  };
  const [ReviewContent, setReviewContent] = useState(postInfo.content);
  const onChange = (e) => {
    const { value } = e.target;
    setReviewContent(value);
  };
  const newReview = async (content) => {
    const newReviewInfo = {
      postTitle: postInfo.postTitle,
      content: content,
      time: 30,
      doDate: postInfo.doDate + "T" + postInfo.startTime,
    };
    await reviewNewApi(postInfo.id, postInfo.postDoDateId, newReviewInfo)
      .then(() => {
        alert("후기가 등록되었습니다");
        window.location.replace("/user/" + userName);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <S.CloseModalBtn onClick={closeModal}>닫기</S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <S.ReviewTop>
              <S.ReviewTitleCont>
                <p>실험명</p>
                <S.ReviewTitle>{postInfo.postTitle}</S.ReviewTitle>
              </S.ReviewTitleCont>
              <S.ReviewContentCont>
                <p>후기</p>
                {state === "READ" ? (
                  <S.ReviewInputView>{postInfo.content}</S.ReviewInputView>
                ) : state === "NEW" ? (
                  <S.ReviewInput onChange={onChange} placeholder="후기작성" />
                ) : (
                  <S.ReviewInput onChange={onChange} value={ReviewContent} />
                )}
              </S.ReviewContentCont>
            </S.ReviewTop>
            <S.ReviewSecond>
              <S.ReviewInfo>
                <S.ReviewDatecont>
                  <p>실험날짜</p>
                  <S.ReviewDate>{postInfo.doDate}</S.ReviewDate>
                </S.ReviewDatecont>
                <S.ReviewTimecont>
                  <p>실험시간</p>
                  <S.ReviewTime>
                    {postInfo.startTime}~{postInfo.endTime}
                  </S.ReviewTime>{" "}
                </S.ReviewTimecont>
              </S.ReviewInfo>
            </S.ReviewSecond>
            {state === "NEW" ? (
              <S.ReviewBtn
                onClick={async (e) => {
                  e.preventDefault();
                  await newReview(ReviewContent);
                }}
              >
                작성완료
              </S.ReviewBtn>
            ) : state === "EDIT" ? (
              <S.ReviewBtn>수정완료</S.ReviewBtn>
            ) : null}
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
