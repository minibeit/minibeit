import React, { useState } from "react";
import Slider from "rc-slider";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import * as S from "./style";
import moment from "moment";
import { useRecoilState } from "recoil";
import { filterState } from "../../../../recoil/filterState";

import "./range.css";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export default function StartTimeInput({ defaultId, onChange }) {
  const [viewSwitch, setViewSwitch] = useState(false);
  const [filter, setFilter] = useRecoilState(filterState);
  const createTimeArr = () => {
    var timeArr = ["00:00"];
    var time = moment().set("hour", 0).set("minute", 0).set("second", 0);
    for (var i = 0; i < 24; i++) {
      timeArr.push(time.add(1, "hours").format("HH:mm"));
    }
    return timeArr;
  };
  const [timeArr] = useState(createTimeArr);
  const [startTimeRange, setStartTimeRange] = useState(filter["startAndEnd"]);

  const submit = () => {
    const copy = { ...filter };
    if (startTimeRange[0] === 0 && startTimeRange[1] === 24) {
      copy.startTime = "";
      copy.endTime = "";
    } else {
      copy.startTime = timeArr[startTimeRange[0]];
      copy.endTime = timeArr[startTimeRange[1]];
    }
    copy.startAndEnd = startTimeRange;
    setFilter(copy);
    setViewSwitch(!viewSwitch);
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setViewSwitch(false);
      }}
    >
      <div>
        <S.SearchInput>
          <input
            type="text"
            value={
              filter.startTime === "" && filter.endTime === ""
                ? "전체"
                : `${filter.startTime}~${filter.endTime}`
            }
            readOnly
            onClick={() => setViewSwitch(!viewSwitch)}
          />
        </S.SearchInput>
        {viewSwitch && (
          <S.Wrapper>
            <p>실험참여가 가능한 시간대를 설정해주세요</p>
            <Range
              min={0}
              max={24}
              value={startTimeRange}
              allowCross={false}
              pushable={1}
              tipFormatter={(e) => `${e < 12 ? "오전" : "오후"} ${timeArr[e]}`}
              onChange={(e) => setStartTimeRange(e)}
            />
            <button onClick={() => submit()}>적용</button>
          </S.Wrapper>
        )}
      </div>
    </ClickAwayListener>
  );
}
