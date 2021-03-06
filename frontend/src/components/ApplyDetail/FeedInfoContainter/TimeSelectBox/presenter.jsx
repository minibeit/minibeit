import React from "react";
import moment from "moment";
import { ReactComponent as ArrowIcon } from "../../../../svg/체크.svg";
import { CalendarButton } from "../../../Common";

import * as S from "../../style";

export default function Presenter({
  feedId,
  moveDate,
  viewDoDate,
  setViewDoDate,
  doTimeList,
  startDate,
  endDate,
  selectDate,
  apply,
}) {
  const disableTimeBtn = (time, isFull) => {
    if (new Date(time) < new Date()) {
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
            <p>{moment(viewDoDate).format("MM월 DD일")}</p>
            <ArrowIcon
              style={{ transform: " rotate(270deg)" }}
              id="next"
              onClick={moveDate}
            />
          </div>
          <CalendarButton
            feedId={feedId}
            minDate={new Date(startDate)}
            maxDate={new Date(endDate)}
            currentDate={new Date(viewDoDate)}
            setCurrentDate={setViewDoDate}
          />
        </S.Navigation>
        <div>
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
                    <label
                      htmlFor={a.id}
                    >{`${a.startTime}~${a.endTime}`}</label>
                  </S.TimeBtn>
                );
              })}
          </S.TimeView>
        </div>
      </S.TimeSelectBox>
    </div>
  );
}
