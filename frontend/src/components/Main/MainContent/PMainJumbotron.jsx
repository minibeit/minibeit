import React from "react";
import * as S from "../style";
import PSlider from "./PSlider";
import {Link} from "react-scroll";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


function PMainJumbotron() {


  return (
    <S.BackGround>
      <S.MainJumbotron>
          <S.JComment>초단기 구인구직을 위한<br /> 딱 맞는 퍼즐, 미니바이트</S.JComment>
          <div display="inline">
            <Link to="1" spy={true} smooth={true}><S.WhiteButton>참여하기</S.WhiteButton></Link>
            <Link to="2" spy={true} smooth={true}><S.WhiteButton>모집하기</S.WhiteButton></Link>
          </div>
          <S.Ptag>일단 둘러볼래요</S.Ptag>
          <KeyboardArrowDownIcon color="disabled"/>
      </S.MainJumbotron>
      <S.Section id="1">
          <S.BlueButton>참여하기</S.BlueButton>
          <S.MComment>가까운 위치에, 남는 시간에 <br/> 간편하게 지원하기 </S.MComment>
          <PSlider/>
      </S.Section>
      <S.Section id="2">
          <S.BlueButton>모집하기</S.BlueButton>
          <S.MComment>가장 쉽고 빠르게 <br/> 원하는 스케줄로 모집하기 </S.MComment>
          <PSlider/>
      </S.Section>
      <div background-color="#F9F9F9">
      <S.Jumbo>
      <S.JComment>세상에 없었던<br/>새로운 <S.Dot>구인구직</S.Dot> 서비스,<br/>미니바이트</S.JComment>
      </S.Jumbo>
      </div>

    </S.BackGround>
  );
}

export default PMainJumbotron;