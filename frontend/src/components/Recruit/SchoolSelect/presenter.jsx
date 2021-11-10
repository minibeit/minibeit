import SearchInput from "./SearchInput";

import * as S from "../style";

export default function Presenter({
  recruit,
  school,
  setSchool,
  selectSchool,
  movePage,
}) {
  return (
    <S.Page>
      <S.SchoolSelectContainer>
        <p>{recruit.businessProfile.name}님!</p>
        <p>원하는 위치 근처의 학교를 선택하세요</p>
        <S.SchoolSearchBox>
          <p>학교명</p>
          <SearchInput onChange={setSchool} />
          <button
            disabled={school ? false : true}
            onClick={() => {
              selectSchool();
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
