import styled from "styled-components";


export const AlertBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
`;
export const AlertBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  width: 30rem;
  height: 20rem;
  border-radius: 35px;
`;

const Button = styled.button`
  position: relative;
  width: 9rem;
  height: 2.7rem;
  font-size: 13px;
  line-height: 2.5rem;
  border-radius: 30px;
  cursor: pointer;
`;

export const GrayButton = styled(Button)`
color: #FFFFFF;
border: 1px solid #FFFFFF;
background: #C4C4C4;
`;

export const BlueButton = styled(Button)`
color: #FFFFFF;
border: 1px solid #0642FF;
background: #0642FF;
`;


export const AlertContent = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-top: 20px;

  & > p:first-child{
    width: 25rem;
    font-size: 23px;
    text-align: center;
    line-height: 34px;
    font-weight: bold;
  }
  
  & > p:nth-child(2) {
    width: 25rem;
    font-size: 13px;
    color: #000;
    text-align: center;
    line-height: 20px;
  }


  & > div:nth-child(3) {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    margin-top: 2.3rem;
  }
`;
