import React from "react";

import SearchInput from "../SearchInput";

import * as S from "../style";

export default function SchoolSelect({ inputData, setInputData }) {
  return (
    <div>
      <S.SchoolBox>
        <p>관심학교</p>
        <SearchInput
          onChange={(e) => {
            const copy = { ...inputData };
            copy.schoolId = e ? e.value : null;
            setInputData(copy);
          }}
        />
      </S.SchoolBox>
    </div>
  );
}
