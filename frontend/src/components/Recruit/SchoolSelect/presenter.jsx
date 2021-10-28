import SchoolSelect from "../../Common/SchoolSelect";

import * as S from "../style";

export default function Presenter({ recruit, selectSchool, movePage }) {
  return (
    <S.Page>
      <S.SchoolSelectContainer>
        <p>{recruit.businessProfile.name}님!</p>
        <p>원하는 위치 근처의 학교를 선택하세요</p>
        <S.SchoolSearchBox>
          <p>학교명</p>
          <SchoolSelect onChange={selectSchool} />
          <button
            disabled={recruit.school.id ? false : true}
            onClick={() => {
              movePage(2);
            }}
          >
            적용
          </button>
        </S.SchoolSearchBox>
      </S.SchoolSelectContainer>
    </S.Page>
  );
}
