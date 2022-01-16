import React, { useEffect, useState } from "react";
import { getBprofileInfo } from "../../../utils";

import Presenter from "./presenter";

export default function BProfileSelect({
  movePage,
  bpList,
  recruit,
  setRecruit,
  userBProfile,
}) {
  const [modalSwitch, setModalSwitch] = useState(false);
  const pushBprofileInfo = (id) => {
    getBprofileInfo(id).then((res) => {
      let copy = { ...recruit };
      copy.businessProfile = {
        id: res.data.data.id,
        name: res.data.data.name,
      };
      copy.address = res.data.data.place;
      copy.detailAddress = res.data.data.placeDetail;
      copy.contact = res.data.data.contact;
      setRecruit(copy);
    });
  };

  const selectBP = (id, name) => {
    const copy = { ...recruit };
    copy.businessProfile = {
      id: id,
      name: name,
    };
    setRecruit(copy);
    pushBprofileInfo(id);
    movePage(1);
  };

  useEffect(() => {
    if (userBProfile) {
      pushBprofileInfo(userBProfile);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Presenter
      bpList={bpList}
      selectBP={selectBP}
      recruit={recruit}
      setModalSwitch={setModalSwitch}
      modalSwitch={modalSwitch}
    />
  );
}
