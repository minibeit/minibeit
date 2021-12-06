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
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const date = day >= 10 ? day : "0" + day;
  const hours = today.getHours();
  const min = today.getMinutes();
  const nowDay = `${year}-${month}-${date}`;
  const nowTime = `${hours}:${min}`;

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
                <>
                  {viewDoDate > nowDay ? (
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
                  ) : viewDoDate === nowDay && a.startTime > nowTime ? (
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
                  ) : (
                    <S.Xdiv>
                      <div onClick={() => alert("지원할 수 없습니다!")} />
                      <button
                        key={a.id}
                        id={a.id}
                        disabled={
                          a.id === parseInt(apply["postDoDateId"])
                            ? true
                            : false
                        }
                      >
                        {a.startTime}~{a.endTime}
                      </button>
                    </S.Xdiv>
                  )}
                </>
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
