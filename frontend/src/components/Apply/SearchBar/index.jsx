import React from "react";

import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";

import Presenter from "./presenter";

export default function SearchBar({
  feedList,
  search,
  school,
  setSchool,
  date,
  setDate,
}) {
  const userSchoolId = useRecoilValue(userState).schoolId;

  return (
    <Presenter
      feedList={feedList}
      userSchoolId={userSchoolId}
      school={school}
      setSchool={setSchool}
      date={date}
      setDate={setDate}
      search={search}
    />
  );
}
