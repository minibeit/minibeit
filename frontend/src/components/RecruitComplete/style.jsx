import styled from "styled-components";

export const Background = styled.div`
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

    & > p:first-child {
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
  min-width: 15em;
  padding: 1em 1.5em;
  border-radius: 2em;
  font-weight: bold;
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
