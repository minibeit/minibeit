import React from "react";

import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";

import Presenter from "./presenter";

export default function SearchBar({
  feedList,
  search,
  filter,
  setFilter,
  date,
  setDate,
}) {
  const userSchoolId = useRecoilValue(userState).schoolId;

  return (
    <Presenter
      feedList={feedList}
      userSchoolId={userSchoolId}
      filter={filter}
      setFilter={setFilter}
      date={date}
      setDate={setDate}
      search={search}
    />
  );
}
