import React,{useState} from "react";
import * as S from "./style";
import MainSlide from "./MainSlide";
import {Link} from "react-scroll";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import PersonalInformation from "../Common/Alert/PersonalInformation";



function MainComponent () {

  const [alertSwitch, setAlertSwitch] = useState(false);



  const onClick = () => {
    setAlertSwitch(true);
  };


  
  return (
    <S.BackGround>
      <S.MainJumbotron>
          <p>초단기 구인구직을 위한<br /> 딱 맞는 퍼즐, 미니바이트</p>
          <div>
            <Link to="1" spy={true} smooth={true}><S.WhiteButton>참여하기</S.WhiteButton></Link>
            <Link to="2" spy={true} smooth={true}><S.WhiteButton>모집하기</S.WhiteButton></Link>
          </div>
          <p>일단 둘러볼래요</p>
          <Link to="3" spy={true} smooth={true}><KeyboardArrowDownIcon color="disabled"/></Link>
      </S.MainJumbotron>
      <S.Section id="1">
          <S.BlueButton>참여하기</S.BlueButton>
          <p>가까운 위치에, 남는 시간에 <br/> 간편하게 지원하기 </p>
          <MainSlide/>
      </S.Section>
      <S.Section id="2">
          <S.BlueButton>모집하기</S.BlueButton>
          <p>가장 쉽고 빠르게 <br/> 원하는 스케줄로 모집하기 </p>
          <MainSlide/>
      </S.Section>
      <S.LastJumbo id="3">
      <p>세상에 없었던<br/>새로운 <span>구인구직</span> 서비스,<br/>미니바이트</p>
      </S.LastJumbo>


      {/* 여기여기여기여기여깅겨ㅣ */}
      <button onClick={onClick}>알럿만들기</button>
      
      {alertSwitch ? <PersonalInformation setAlertSwitch={setAlertSwitch}/>:null}
     
    </S.BackGround>
  );
}

export default MainComponent;
