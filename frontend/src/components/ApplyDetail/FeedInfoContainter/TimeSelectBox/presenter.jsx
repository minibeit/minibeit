import React from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import * as S from "../../style";

export default function Presenter({
  moveDate,
  viewDoDate,
  doTimeList,
  selectDate,
  apply,
}) {
  return (
    <div>
      <S.TimeSelectBox>
        <S.Navigation>
          <div>
            <ArrowLeftIcon id="pre" onClick={moveDate} />
            <p>{viewDoDate}</p>
            <ArrowRightIcon id="next" onClick={moveDate} />
          </div>
        </S.Navigation>
        <S.TimeView>
          {doTimeList ? (
            doTimeList.map((a) => {
              return (
                <button
                  key={a.id}
                  id={a.id}
                  onClick={selectDate}
                  disabled={
                    a.id === parseInt(apply["postDoDateId"]) ? true : false
                  }
                >
                  {a.startTime}~{a.endTime}
                </button>
              );
            })
          ) : (
            <p>이 날은 실험이 없습니다</p>
          )}
        </S.TimeView>
      </S.TimeSelectBox>
    </div>
  );
}
