import React from "react";

import * as S from "../style";

export default function PFilterContainer({ schoolList, userSchoolId }) {
  return (
    <>
      <S.FilterBox>
        <S.SelectInput name="schoolId" defaultValue={userSchoolId}>
          <option value={userSchoolId} disabled>
            {schoolList.find((ele) => ele.id === userSchoolId) === undefined
              ? null
              : schoolList.find((ele) => ele.id === userSchoolId).name}
          </option>
          {schoolList.map(({ id, name }) => (
            <option value={id} key={id}>
              {name}
            </option>
          ))}
        </S.SelectInput>
        <S.FilterSubmitBtn>검색</S.FilterSubmitBtn>
      </S.FilterBox>
    </>
  );
}
