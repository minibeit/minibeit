import React, { useState } from "react";
import PropTypes from "prop-types";

import * as S from "../style";
import { useRecoilValue } from "recoil";
import { filterState } from "../../../recoil/filterState";
import { userState } from "../../../recoil/userState";

PBtnContainer.propTypes = {
  getFeedList: PropTypes.func.isRequired,
  totalPages: PropTypes.number,
};

export default function PBtnContainer({ getFeedList, totalPages }) {
  const filter = useRecoilValue(filterState);
  const user = useRecoilValue(userState);
  const [pageNow, setPageNow] = useState(1);
  const [firstOfPageArr, setFirstOfPageArr] = useState(1);

  //페이지 이동하는 로직
  const movePage = (e) => {
    setPageNow(parseInt(e.target.textContent));
    const page = e.target.textContent;
    const schoolId = filter.schoolId ? filter.schoolId : user.schoolId;
    const date = filter.date;
    const payment = filter.payment;
    getFeedList(page, schoolId, date, payment);
  };

  //여러개의 페이지 버튼을 생성하는 로직
  const pageArr = (totalPages, firstOfPageArr) => {
    let arr = [];
    if (totalPages - firstOfPageArr < 10) {
      for (
        let i = firstOfPageArr;
        i <= firstOfPageArr + (totalPages - firstOfPageArr);
        i++
      ) {
        arr.push(i);
      }
    } else {
      for (let i = firstOfPageArr; i < firstOfPageArr + 10; i++) {
        arr.push(i);
      }
    }
    return arr;
  };

  // 1, 11, 21 씩 페이지 리스트가 변경되는 로직
  const changePageBtnArr = (e) => {
    if (e.target.value === "next") {
      if (totalPages - 10 > firstOfPageArr) {
        const firstOfPageArr_cp = firstOfPageArr;
        setFirstOfPageArr(firstOfPageArr_cp + 10);
      }
    } else {
      if (firstOfPageArr > 1) {
        const firstOfPageArr_cp = firstOfPageArr;
        setFirstOfPageArr(firstOfPageArr_cp - 10);
      }
    }
  };
  return (
    <S.BtnContainer>
      <button value="pre" onClick={changePageBtnArr}>
        이전
      </button>
      {pageArr(totalPages, firstOfPageArr).map((a) => {
        return (
          <S.PageBtn
            key={a}
            onClick={movePage}
            disabled={pageNow === a ? true : false}
          >
            {a}
          </S.PageBtn>
        );
      })}
      <button value="next" onClick={changePageBtnArr}>
        다음
      </button>
    </S.BtnContainer>
  );
}
