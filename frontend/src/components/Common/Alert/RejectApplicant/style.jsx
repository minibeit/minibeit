import styled from "styled-components";

export const AlertBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  width: 30rem;
  height: 20rem;
  border-radius: 35px;
  padding: 0 1rem;
  @media only screen and (max-width: 700px) {
    padding: 1rem;
    width: 20rem;
    height: 14rem;
  }
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
  color: #ffffff;
  border: 1px solid #ffffff;
  background: #c4c4c4;
`;

export const BlueButton = styled(Button)`
  color: #ffffff;
  border: 1px solid #0642ff;
  background: #0642ff;
`;

export const AlertContent = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  & > svg {
    width: 2rem;
    path {
      fill: #0642ff;
    }
  }

  & > p:nth-child(2) {
    font-size: 20px;
    text-align: center;
    line-height: 34px;
  }

  & > p > span:first-child {
    font-weight: 700;
  }

  & > p > span:nth-child(3) {
    font-weight: 700;
    color: #0642ff;
  }

  & > div:nth-child(3) {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
`;
