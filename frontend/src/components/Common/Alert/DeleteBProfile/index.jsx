import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";

// 비즈니스 프로필 삭제 확인

export default function DeliteBProfile({ a, setDeleteAlert, deleteBusiness }) {
  return (
    <Portal>
      <S.AlertBox>
        <S.AlertContent>
          <InfoIcon />
          <p>
            <span>정말로 삭제하시겠어요?</span>
            <br />
            비즈니스 프로필이 없으면,
            <br />
            게시글을 통해서 모집을 할 수 없어요.
          </p>
          <div>
            <S.GrayButton onClick={() => setDeleteAlert(0)}>
              아니오, 관둘래요
            </S.GrayButton>
            <S.BlueButton onClick={() => deleteBusiness(a)}>
              네, 삭제할래요
            </S.BlueButton>
          </div>
        </S.AlertContent>
      </S.AlertBox>
    </Portal>
  );
}
