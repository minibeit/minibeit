import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";

import { downloadFileApi } from "../../../../utils";

import Portal from "../Portal";

import * as S from "./style";

export default function ApplyImgsModal({ files, setSliderSwitch }) {
  const [currentImg, setCurrentImg] = useState(0);

  const downloadImg = () => {
    downloadFileApi(files[currentImg].name).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", files[currentImg].name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <Portal>
      <S.Container>
        <div>
          <S.Button onClick={() => setSliderSwitch(false)}>닫기</S.Button>
          <S.Button onClick={downloadImg}>다운로드</S.Button>
        </div>
        <Carousel
          onChange={(now, pre) => {
            setCurrentImg(now);
          }}
          animation={"fade"}
          autoPlay={false}
          index={currentImg}
          navButtonsAlwaysVisible={true}
        >
          {files.map((image, i) => (
            <S.SliderImg key={i} img={image.url} />
          ))}
        </Carousel>
      </S.Container>
    </Portal>
  );
}
