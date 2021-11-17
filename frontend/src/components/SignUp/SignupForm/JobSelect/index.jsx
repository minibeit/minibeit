import React from "react";

import JobList from "../../../../constants/JobList";

import * as S from "../style";

export default function JobSelect({ inputData, setInputData }) {
  return (
    <>
      <div>
        <S.JobContainer>
          <p>직업</p>
          {JobList.map((a) => {
            return (
              <S.JobButton
                key={a.id}
                onClick={() => {
                  const copy = { ...inputData };
                  copy.job = a.name;
                  setInputData(copy);
                }}
                disabled={a.name === inputData.job ? true : false}
              >
                {a.icon} {a.name}
              </S.JobButton>
            );
          })}
        </S.JobContainer>
      </div>
    </>
  );
}
