import React from "react";
import SchoolInput from "./SchoolInput";

import * as S from "../style";

export default function SchoolSelect({ inputData, setInputData }) {
  return (
    <div>
      <S.SchoolBox>
        <p>관심학교</p>
        <div>
          <SchoolInput
            onChange={(target) => {
              const copy = { ...inputData };
              copy.schoolId = target.id;
              setInputData(copy);
            }}
          />
        </div>
      </S.SchoolBox>
    </div>
  );
}
