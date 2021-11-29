import React from "react";

import Presenter from "./presenter";

export default function BProfileSelect({
  movePage,
  bpList,
  recruit,
  setRecruit,
}) {
  const selectBP = (e) => {
    var id = parseInt(e.target.parentNode.id);
    var name = e.target.parentNode.nextSibling.textContent;
    const copy = { ...recruit };
    copy.businessProfile = {
      id: id,
      name: name,
    };
    setRecruit(copy);
    movePage(1);
  };

  return <Presenter bpList={bpList} selectBP={selectBP} recruit={recruit} />;
}
