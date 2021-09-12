import React, { useState } from "react";
import PFilterContainer from "./PFilterContainer";
import PListContainer from "./PListContainer";
import SchoolSelectModal from "../../Common/Modal/SchoolSelectModal";
import { feedlistApi } from "../../../utils/feedApi";

export default function FilterAndList() {
  const [feedList, setFeedList] = useState();
  const [modalSwitch, setModalSwitch] = useState(false);

  const getFeedList = async (schoolId, date) => {
    await feedlistApi(schoolId, date)
      .then((res) => {
        setFeedList(res.data.content);
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
        <SchoolSelectModal setModalSwitch={setModalSwitch} />
      ) : null}
      {feedList ? <PListContainer feedList={feedList} /> : null}
    </>
  );
}
