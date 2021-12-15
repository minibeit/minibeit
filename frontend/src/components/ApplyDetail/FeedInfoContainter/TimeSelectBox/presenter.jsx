import React from "react";
import { ReactComponent as ArrowIcon } from "../../../../svg/체크.svg";

import * as S from "../../style";
import moment from "moment";

export default function Presenter({
  moveDate,
  viewDoDate,
  doTimeList,
  selectDate,
  apply,
}) {
  const disableTimeBtn = (time, isFull) => {
    if (moment(time) < moment(new Date())) {
      return true;
    } else if (isFull) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <S.TimeSelectBox>
        <S.Navigation>
          <div>
            <ArrowIcon
              style={{ transform: " rotate(90deg)" }}
              id="pre"
              onClick={moveDate}
            />
            <p>{viewDoDate}</p>
            <ArrowIcon
              style={{ transform: " rotate(270deg)" }}
              id="next"
              onClick={moveDate}
            />
          </div>
        </S.Navigation>
        <S.TimeView>
          {doTimeList &&
            doTimeList.map((a) => {
              return (
                <S.TimeBtn key={a.id}>
                  <input
                    id={a.id}
                    disabled={disableTimeBtn(
                      `${viewDoDate}T${a.startTime}`,
                      a.isFull
                    )}
                    value={`${a.startTime}~${a.endTime}`}
                    onClick={selectDate}
                    defaultChecked={a.id === apply.postDoDateId}
                    type="radio"
                    name="time"
                  />
                  <label htmlFor={a.id}>{`${a.startTime}~${a.endTime}`}</label>
                </S.TimeBtn>
              );
            })}
        </S.TimeView>
      </S.TimeSelectBox>
    </div>
  );
}
