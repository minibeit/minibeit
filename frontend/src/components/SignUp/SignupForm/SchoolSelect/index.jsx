import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import SearchInput from "./SearchInput";

import * as S from "../style";

export default function SchoolSelect({ inputData, setInputData }) {
  return (
    <div>
      <S.SchoolBox>
        <p>관심학교</p>
        <div>
          <SearchInput
            onChange={(e) => {
              const copy = { ...inputData };
              copy.schoolId = e ? e.value : null;
              setInputData(copy);
            }}
          />
          <SearchIcon />
        </div>
      </S.SchoolBox>
    </div>
  );
}
