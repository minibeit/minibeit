import React from "react";
import PExplainContent from "./PExplainContent";

export default function ExplainContent() {
  const dummycontents = [
    {
      id: 1,
      explain: "설명1",
      src: "http://placeimg.com/200/200/any",
    },
    {
      id: 2,
      explain: "설명2",
      src: "http://placeimg.com/200/200/any",
    },
    {
      id: 3,
      explain: "설명3",
      src: "http://placeimg.com/200/200/any",
    },
  ];
  return (
    <>
      {dummycontents.map((dummycontent) => (
        <PExplainContent key={dummycontent.id} dummycontent={dummycontent} />
      ))}
    </>
  );
}
