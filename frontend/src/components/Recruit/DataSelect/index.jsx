import React from "react";
import "moment/locale/ko";

import DateInput from "./DateInput";
import SearchInput from "./SearchInput";

import { ReactComponent as MinusIcon } from "../../../svg/마이너스.svg";
import { ReactComponent as PlusIcon } from "../../../svg/플러스.svg";

import * as S from "../style";

export default function DataSelect({ recruit, setRecruit }) {
  /* 모집인원 카운트 로직 */
  const changeHeadCount = (value) => {
    if (value === "minus") {
      const copy = { ...recruit };
      if (copy.headCount >= 1) {
        copy.headCount -= 1;
      }
      setRecruit(copy);
    } else {
      const copy = { ...recruit };
      copy.headCount += 1;
      setRecruit(copy);
    }
  };

  /* 실험 시간 단위 로직 */
  const changeDoTime = (value) => {
    if (value === "minus") {
      const copy = { ...recruit };
      if (copy.doTime > 30) {
        copy.doTime -= 30;
        setRecruit(copy);
      }
    } else {
      const copy = { ...recruit };
      copy.doTime += 30;
      setRecruit(copy);
    }
  };

  return (
    <S.Page>
      <S.DataSelectContainer>
        <S.DataSelectHeader>
          <p>{recruit.businessProfile.name} 님!</p>
          <p>생성할 모집공고에 대한 날짜를 입력해주세요</p>
        </S.DataSelectHeader>
        <S.SelectBox>
          <div>
            <p>위치</p>
            <div>
              <SearchInput onChange={(e) => console.log(e)} />
            </div>
          </div>
          <div>
            <p>날짜</p>
            <div>
              <DateInput
                minDate={new Date()}
                onChange={(e) => console.log(e)}
              />
            </div>
          </div>
          <div>
            <p>시간 단위</p>
            <S.CountBox>
              <button onClick={() => changeDoTime("minus")}>
                <MinusIcon />
              </button>
              <p>{recruit.doTime}분</p>
              <button onClick={() => changeDoTime("plus")}>
                <PlusIcon />
              </button>
            </S.CountBox>
          </div>
          <div>
            <p>시간 단위당 모집 인원</p>
            <S.CountBox>
              <button onClick={() => changeHeadCount("minus")}>
                <MinusIcon />
              </button>
              <p>{recruit.headCount}명</p>
              <button onClick={() => changeHeadCount("plus")}>
                <PlusIcon />
              </button>
            </S.CountBox>
          </div>
        </S.SelectBox>
      </S.DataSelectContainer>
    </S.Page>
  );
}
