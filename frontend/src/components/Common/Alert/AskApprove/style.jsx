import styled from "styled-components";

export const AlertBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  width: 27rem;
  height: 18rem;
  border-radius: 2.25rem;
  padding: 0 1rem;
  @media only screen and (max-width: 700px) {
    padding: 1rem;
    width: 20rem;
    height: 15rem;
  }
`;

const Button = styled.button`
  position: relative;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  border-radius: 2rem;
  cursor: pointer;
  min-width: 7rem;
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
  gap: 1rem;
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
    white-space: nowrap;
    font-weight: 700;
    font-size: 1.3rem;
    text-align: center;
    line-height: 1.875rem;
  }

  & > div:nth-child(3) {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  @media only screen and (max-width: 700px) {
    & > p:nth-child(2) {
      width: 18rem;
      white-space: wrap;
      text-align: center;
    }
    & > div:nth-child(3) {
      margin-top: 1rem;
    }
  }
`;
