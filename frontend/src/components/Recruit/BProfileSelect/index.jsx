import React, { useState } from "react";

import Presenter from "./presenter";

export default function BProfileSelect({
  movePage,
  bpList,
  recruit,
  setRecruit,
}) {
  const selectBP = (id, name) => {
    const copy = { ...recruit };
    copy.businessProfile = {
      id: id,
      name: name,
    };
    setRecruit(copy);
    movePage(1);
  };
  const [modalSwitch, setModalSwitch] = useState(false);

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
