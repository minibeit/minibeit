import React, { useEffect, useState } from "react";
import PFilterContainer from "./PFilterContainer";
import PListContainer from "./PListContainer";
import SchoolSelectModal from "../../Common/Modal/SchoolSelectModal";
import { schoolGetApi } from "../../../utils/schoolApi";
import { feedlistApi } from "../../../utils/feedApi";

export default function FilterAndList() {
  const [schoolList, setSchoolList] = useState();
  const [modalSwitch, setModalSwitch] = useState(false);
  const getSchoolList = () => {
    schoolGetApi()
      .then((res) => {
        setSchoolList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getFeedList = async (schoolId, date) => {
    await feedlistApi(schoolId, date)
      .then((res) => {
        console.log(res);
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
      <PFilterContainer
        setModalSwitch={setModalSwitch}
        schoolList={schoolList}
        getFeedList={getFeedList}
      />
      {modalSwitch ? (
        <SchoolSelectModal
          setModalSwitch={setModalSwitch}
          schoolList={schoolList}
        />
      ) : null}
      <PListContainer />
    </>
  );
}
