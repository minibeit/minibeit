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
  padding: 0 1rem;
  @media only screen and (max-width: 700px) {
    padding: 1rem;
    width: 20rem;
    height: 15rem;
  }
`;

const Button = styled.button`
  position: relative;
  font-size: 0.85rem;
  padding: 1rem;
  font-size: 0.85rem;
  border-radius: 2rem;
  cursor: pointer;
  min-width: 10rem;

  @media only screen and (max-width: 700px) {
    padding: 0.5rem 1rem;
    min-width: 8rem;
  }
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
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  padding: 1.25rem;
  margin-top: 1.25rem;

  & > p:first-child {
    width: 25rem;
    font-size: 1.5rem;
    text-align: center;
    line-height: 2rem;
    font-weight: bold;
  }

  & > p:nth-child(2) {
    width: 25rem;
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    line-height: 1.5rem;
  }

  & > div:nth-child(3) {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    margin-top: 2.3rem;
  }

  @media only screen and (max-width: 700px) {
    & > p:first-child {
      font-size: 1.4rem;
    }
    & > div:nth-child(3) {
      margin-top: 1.5rem;
    }
  }
`;
