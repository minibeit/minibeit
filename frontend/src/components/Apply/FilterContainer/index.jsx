import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { schoolGetApi } from "../../../utils/schoolApi";
import PFilterContainer from "./PFilterContainer";
import { LoadingSpinner } from "../../Common";

export default function FilterContainer() {
  const [schoolList, setSchoolList] = useState();
  const userSchoolId = useRecoilValue(userState).schoolId;

  const getSchoolList = () => {
    schoolGetApi()
      .then((res) => {
        setSchoolList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSchoolList();
  }, []);
  return (
    <>
      {schoolList ? (
        <PFilterContainer schoolList={schoolList} userSchoolId={userSchoolId} />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
