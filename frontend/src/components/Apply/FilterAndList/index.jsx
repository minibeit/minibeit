import React, { useState } from "react";
import PFilterContainer from "./PFilterContainer";
import PListContainer from "./PListContainer";
import SchoolSelectModal from "../../Common/Modal/SchoolSelectModal";
import { feedlistApi } from "../../../utils/feedApi";
import PBtnContainer from "./PBtnContainer";

export default function FilterAndList() {
  const [feedList, setFeedList] = useState();
  const [totalPages, setTotalPages] = useState();
  const [modalSwitch, setModalSwitch] = useState(false);

  const getFeedList = async (page, schoolId, date, payment) => {
    await feedlistApi(page, schoolId, date, payment)
      .then((res) => {
        setFeedList(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <PFilterContainer
        setModalSwitch={setModalSwitch}
        getFeedList={getFeedList}
      />
      {modalSwitch ? (
        <SchoolSelectModal setModalSwitch={setModalSwitch} use="ApplyList" />
      ) : null}
      {feedList ? <PListContainer feedList={feedList} /> : null}
      <PBtnContainer totalPages={totalPages} getFeedList={getFeedList} />
    </>
  );
}
