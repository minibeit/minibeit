import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// 상세내용만 수정이 가능하다고 알려주는 알림창

export default function EditOnlyDetails({ setEditAlert, setEditSwitch }) {
  const clickOutside = (e) => {
    e.target === e.currentTarget && setEditAlert(false);
    document.querySelector("body").removeAttribute("style");
  };
  const clickBtn = () => {
    setEditAlert(false);
    setEditSwitch(true);
    document.querySelector("body").removeAttribute("style");
  };

  return (
    <Portal>
      <S.AlertBackground onClick={(e) => clickOutside(e)}>
        <S.AlertBox>
          <S.AlertContent>
            <ErrorOutlineIcon sx={{ fontSize: 40, color: "#0642FF" }} />
            <p>상세내용 수정만 가능합니다.</p>
            <p>제목, 시간, 조건, 지급, 내용, 장소 등은 수정이 불가합니다.</p>
            <button onClick={clickBtn}>네, 알겠어요.</button>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  );
}
