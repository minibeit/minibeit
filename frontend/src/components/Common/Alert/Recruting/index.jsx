import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";

// 현재 모집중인 실험이 있는데 비즈니스 프로필을 삭제할때를 알려주는 알림창

export default function Recruting({ setDeleteAlert }) {
  return (
    <Portal>
      <S.AlertBackground
        onClick={(e) => e.target === e.currentTarget && setDeleteAlert(0)}
      >
        <S.AlertBox>
          <S.AlertContent>
            <InfoIcon />
            <p>
              현재 모집중인 실험이 있습니다.
              <p>
                글내리기를 눌러 게시글을 삭제하거나
                <br />
                비즈니스 프로필의 관리자를 바꾼 뒤 다시 진행해주세요.
              </p>
            </p>
            <button onClick={() => setDeleteAlert(0)}>네, 알겠어요.</button>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  );
}
