import styled from "styled-components";

export const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
`;

export const Box = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
 
  & > div:first-child {
    width: 35rem;
    height: 20rem;
    border-radius: 35px;
    box-shadow: 10px 10px 30px rgba(189, 189, 189, 0.2);
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
    text-align: center;

    & > p:first-child{
      font-weight: 700;
      font-size: 1.5rem;
    }
    & > img:nth-child(2) {
      width: 8rem;
      height: 8rem;
    }
    & > p:nth-child(3) {
      font-size: 0.8rem;
      line-height: 1.2rem;
    }
  }

  & > div:nth-child(2) {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    margin-top: 2rem;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const Button = styled.button`
  position: relative;
  width: 16rem;
  height: 2.5rem;
  font-size: 14px;
  font-weight: 600;
  line-height: 2.5rem;
  border-radius: 30px;
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