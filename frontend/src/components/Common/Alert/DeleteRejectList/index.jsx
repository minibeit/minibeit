import React, { useState } from "react";
import Portal from "../Portal";
import * as S from "../style";
import { ReactComponent as InfoIcon } from "../../../..//svg/경고.svg";
import { ReactComponent as XIcon } from "../../../..//svg/엑스.svg";

import { toast } from "react-toastify";

export default function DeleteRejectList({
  setDeleteRejectList,
  id,
  deleteRejectedApi,
  changeFeedData,
}) {
  const [secondAlert, setSecondAlert] = useState(false);
  const doDelete = (postId) => {
    deleteRejectedApi(postId)
      .then(() => setSecondAlert(true))
      .catch((err) => toast.error("삭제할 수 없는 실험입니다."));
  };
  return (
    <Portal>
      <S.AlertBox>
        <S.AlertHeader>
          <XIcon onClick={() => setDeleteRejectList(false)} />
        </S.AlertHeader>
        {!secondAlert ? (
          <S.AlertContent>
            <InfoIcon />
            <S.AlertText>
              <span>게시물을 리스트에서</span>
              <span> 삭제하시겠습니까?</span>
            </S.AlertText>
            <S.BtnGroup>
              <S.GrayButton onClick={() => setDeleteRejectList(false)}>
                아니오, 관둘래요
              </S.GrayButton>
              <S.BlueButton
                onClick={() => {
                  doDelete(id);
                }}
              >
                네, 삭제할래요.
              </S.BlueButton>
            </S.BtnGroup>
          </S.AlertContent>
        ) : (
          <S.AlertContent>
            <InfoIcon />
            <S.AlertText>
              <p>반려 게시물이 삭제되었습니다.</p>
            </S.AlertText>
            <S.BtnGroup>
              <S.BlueButton
                onClick={() => {
                  setDeleteRejectList(false);
                  setSecondAlert(false);
                  changeFeedData();
                }}
              >
                확인
              </S.BlueButton>
            </S.BtnGroup>
          </S.AlertContent>
        )}
      </S.AlertBox>
    </Portal>
  );
}
