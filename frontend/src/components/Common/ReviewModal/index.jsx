import React from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { editReviewApi, reviewNewApi } from "../../../utils";
import Portal from "../Modal/Portal";
import CloseIcon from "@mui/icons-material/Close";

import * as S from "./style";

export default function ReviewModal({
  doJoin,
  setModalSwitch,
  postInfo,
  state,
}) {
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
    await doJoin(postInfo.postDoDateId);
    const newReviewInfo = {
      postTitle: postInfo.postTitle,
      content: content,
      time: postInfo.time,
      doDate: postInfo.doDate + "T" + postInfo.startTime,
    };
    await reviewNewApi(postInfo.id, postInfo.postDoDateId, newReviewInfo)
      .then(async () => {
        alert("후기가 등록되었습니다");
        window.location.replace("/user/" + userName);
      })
      .catch((err) => console.log(err));
  };
  const nextReview = async () => {
    await doJoin(postInfo.postDoDateId);
    alert("참여완료 상태가 되었습니다.");
    window.location.replace("/user/" + userName);
  };
  const editReview = async (content) => {
    await editReviewApi(postInfo.id, content)
      .then(async () => {
        alert("후기가 수정되었습니다");
        window.location.replace("/user/" + userName);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            {state === "NEW" ? null : (
              <S.CloseModalBtn>
                <CloseIcon onClick={closeModal} />
              </S.CloseModalBtn>
            )}
          </S.ModalHeader>
          <S.ModalContent>
            <S.ReviewTop>
              <S.ReviewTitleCont>
                <p>실험명</p>
                <S.ReviewTitle>
                  <p>{postInfo.postTitle}</p>
                </S.ReviewTitle>
              </S.ReviewTitleCont>
              <S.ReviewContentCont>
                <p>후기</p>
                {state === "READ" ? (
                  <S.ReviewInputView>{postInfo.content}</S.ReviewInputView>
                ) : state === "NEW" ? (
                  <S.ReviewInput
                    cols="50"
                    rows="10"
                    onChange={onChange}
                    placeholder="후기작성"
                  />
                ) : (
                  <S.ReviewInput
                    cols="50"
                    rows="10"
                    onChange={onChange}
                    value={ReviewContent}
                  />
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
              {state === "NEW" ? (
                <>
                  <S.ReviewBtn
                    onClick={async (e) => {
                      e.preventDefault();
                      await newReview(ReviewContent);
                    }}
                  >
                    <p>작성완료</p>
                  </S.ReviewBtn>
                  <S.ReviewBtn
                    onClick={async (e) => {
                      e.preventDefault();
                      await nextReview();
                    }}
                  >
                    <p>다음에 작성하기</p>
                  </S.ReviewBtn>
                </>
              ) : state === "EDIT" ? (
                <S.ReviewBtn
                  onClick={async (e) => {
                    e.preventDefault();
                    await editReview(ReviewContent);
                  }}
                >
                  <p>수정완료</p>
                </S.ReviewBtn>
              ) : null}
            </S.ReviewSecond>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
