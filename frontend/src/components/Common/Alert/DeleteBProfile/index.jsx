import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";

// 비즈니스 프로필 삭제 확인

export default function DeliteBProfile({
  a,
  setDeleteAlert,
  deleteBusiness,
  setSecondAlert,
  secondAlert,
}) {
  return (
    <Portal>
      <S.AlertBox>
        {!secondAlert ? (
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
              <S.GrayButton onClick={() => setDeleteAlert(false)}>
                아니오, 관둘래요
              </S.GrayButton>
              <S.BlueButton onClick={() => deleteBusiness(a)}>
                네, 삭제할래요
              </S.BlueButton>
            </div>
          </S.AlertContent>
        ) : (
          <S.AlertContent2>
            <InfoIcon />
            <p>
              현재 모집중인 실험이 있습니다.
              <p>
                글내리기를 눌러 게시글을 삭제하거나
                <br />
                비즈니스 프로필의 관리자를 바꾼 뒤 다시 진행해주세요.
              </p>
            </p>
            <S.BlueButton
              onClick={() => {
                setDeleteAlert(false);
                setSecondAlert(false);
              }}
            >
              네, 알겠어요.
            </S.BlueButton>
          </S.AlertContent2>
        )}
      </S.AlertBox>
    </Portal>
  );
}
