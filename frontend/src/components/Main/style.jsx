import styled from "styled-components";

export const BackGround = styled.div`
width: 100%;
height: auto;
background-color: #F9F9F9;
`;

export const MainJumbotron = styled.div`
position: relative;
margin-top: 150px;
width: 100%;
height: 100%;
background-color: #FFFFFF;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export const Jumbo = styled(MainJumbotron)`
position: relative;
width: 1277px;
height: 860px;
left: 50%;
transform: translateX(-50%);
box-shadow: 10px 10px 30px rgba(189, 189, 189, 0.2);
border-radius: 30px;
`;


const Comment = styled.p`
position: relative;
height: 200;
font-size: 64px;
font-weight: 700;
line-height: 95px;
color: #000000;
`;

export const JComment = styled(Comment)`
position: relative;
text-align: center;
`;

export const Dot = styled(JComment)`
display: inline;
text-emphasis-style: filled #0642FF;
-webkit-text-emphasis: filled #0642FF;
`;

export const MComment = styled(Comment)`
position: relative;
text-align: left;
margin-left: 400px;
margin-bottom: 100px;
`;

const Button = styled.button`
position: relative;
margin: 50px;
width: 267px;
height: 85px;
font-size: 36px;
font-weight: bold;
line-height: 130%;
box-shadow: 10px 10px 30px rgba(189, 189, 189, 0.2);
border-radius: 42.5px;
`;

export const WhiteButton = styled(Button)`
position: relative;
color: #0642FF;
border: 1px solid #FFFFFF;
background: #FFFFFF;
`;

export const BlueButton = styled(Button)`
position: relative;
display: block;
color: #FFFFFF;
border: 1px solid #0642FF;
background: #0642FF;
margin-left: 400px;
`;

export const Ptag = styled.p`
position: relative;
width: 140px;
height:27px;
font-size: 18px;
color: #D7D7D7;
line-height: 27px;
text-align: center;
text-decoration: underline;
margin: 70px 0 70px 0;
 `;

export const Section = styled.div`
position: relative;
padding: 150px 0 ;
width: 100%;
`;

