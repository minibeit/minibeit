import React from "react";
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

  const movePage = (e) => {
    const page = e.target.textContent;
    const schoolId = filter.schoolId ? filter.schoolId : user.schoolId;
    const date = filter.date;
    const payment = filter.payment;
    getFeedList(page, schoolId, date, payment);
  };

  return (
    <S.BtnContainer>
      {[...Array(totalPages)].map((a, i) => {
        return (
          <button key={i} onClick={movePage}>
            {i + 1}
          </button>
        );
      })}
    </S.BtnContainer>
  );
}
