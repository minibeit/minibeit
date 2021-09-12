import React, { useEffect, useState } from "react";
import PFilterContainer from "./PFilterContainer";
import PListContainer from "./PListContainer";
import SchoolSelectModal from "../../Common/Modal/SchoolSelectModal";
import { schoolGetApi } from "../../../utils/schoolApi";
import { feedlistApi } from "../../../utils/feedApi";
import PBtnContainer from "./PBtnContainer";

export default function FilterAndList() {
  const [schoolList, setSchoolList] = useState();
  const [feedList, setFeedList] = useState();
  const [totalPages, setTotalPages] = useState();
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
  const getFeedList = async (page, schoolId, date) => {
    await feedlistApi(page, schoolId, date)
      .then((res) => {
        setFeedList(res.data.content);
        setTotalPages(res.data.totalPages);
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
      {feedList ? <PListContainer feedList={feedList} /> : null}
      <PBtnContainer totalPages={totalPages} getFeedList={getFeedList} />
    </>
  );
}
