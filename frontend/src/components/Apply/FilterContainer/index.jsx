import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import PFilterContainer from "./PFilterContainer";
import SchoolSelectModal from "../../Common/Modal/SchoolSelectModal";
import { filterState } from "../../../recoil/filterState";
import { schoolGetApi } from "../../../utils/schoolApi";

export default function FilterContainer() {
  const [schoolList, setSchoolList] = useState();
  const [modalSwitch, setModalSwitch] = useState(false);
  const filter = useRecoilValue(filterState);
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
      <PFilterContainer
        setModalSwitch={setModalSwitch}
        schoolList={schoolList}
      />
      {modalSwitch ? (
        <SchoolSelectModal
          setModalSwitch={setModalSwitch}
          schoolList={schoolList}
        />
      ) : null}
    </>
  );
}
