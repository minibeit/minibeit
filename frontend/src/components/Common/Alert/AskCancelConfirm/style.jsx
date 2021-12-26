import styled from "styled-components";

export const AlertBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  width: 30rem;
  height: 20rem;
  border-radius: 2.25rem;
`;

const Button = styled.button`
  position: relative;
  width: 9rem;
  height: 2.7rem;
  font-size: 0.85rem;
  line-height: 2.5rem;
  border-radius: 2rem;
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
  gap: 0.625rem;
  justify-content: center;
  align-items: center;
  padding: 1.25rem;
  & > svg {
    width: 2rem;
    path {
      fill: #0642ff;
    }
  }

  & > p:nth-child(2) {
    width: 25rem;
    font-weight: 700;
    font-size: 1.25rem;
    text-align: center;
    line-height: 1.875rem;
  }

  & > p:nth-child(3) {
    font-size: 0.7;
    color: rgba(0, 0, 0, 0.6);
    text-align: center;
    line-height: 1.25rem;
  }

  & > p > span:nth-child(2) {
    color: #0642ff;
    font-weight: 700;
  }

  & > div:nth-child(4) {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    margin-top: 1rem;
  }
`;
