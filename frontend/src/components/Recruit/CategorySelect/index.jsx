import React from "react";

import Presenter from "./presenter";

export default function CategorySelect({ movePage, recruit, setRecruit }) {
  const onClick = (name) => {
    const copy = { ...recruit };
    copy["category"] = name;
    setRecruit(copy);
  };

  return <Presenter onClick={onClick} recruit={recruit} movePage={movePage} />;
}
