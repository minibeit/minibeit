import React from "react";

const style = {
  objectFit: "fill",
  width: "100%",
  height: "100%",
};

export default function PVImg({ img }) {
  var imgUrl;

  if (img) {
    imgUrl = URL.createObjectURL(img);
  }
  return <img src={imgUrl} style={style} alt="" />;
}
