import React from "react";
import { SchoolSearch } from "../../Common";

export default function PSchoolSelect({ recruit, setRecruit }) {
  return (
    <>
      <h2>{recruit.businessProfile.name}님!</h2>
      <h2>원하는 위치 근처의 학교를 선택하세요 </h2>
      <SchoolSearch use="recruit" recruit={recruit} setRecruit={setRecruit} />
      {recruit.school.id ? <button>확인</button> : null}
    </>
  );
}
