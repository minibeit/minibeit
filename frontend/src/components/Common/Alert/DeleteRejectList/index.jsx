import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../..//svg/경고.svg";

export default function DeleteRejectList({
  setDeleteRejectList,
  secondAlert,
  setSecondAlert,
  doDelete,
  id,
  changeFeedData,
}) {
  return (
    <Portal>
      <S.AlertBox>
        {!secondAlert ? (
          <S.AlertContent>
            <InfoIcon />
            <p>게시물을 리스트에서 삭제하시겠습니까?</p>
            <div>
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
            </div>
          </S.AlertContent>
        ) : (
          <S.AlertContent>
            <InfoIcon />
            <p>반려 게시물이 삭제되었습니다.</p>
            <div>
              <S.BlueButton
                onClick={() => {
                  setDeleteRejectList(false);
                  setSecondAlert(false);
                  changeFeedData();
                }}
              >
                확인
              </S.BlueButton>
            </div>
          </S.AlertContent>
        )}
      </S.AlertBox>
    </Portal>
  );
}
