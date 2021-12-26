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
    line-height: 35px;
    font-weight: 700;
    width: 25rem;
  }
  & > button:nth-child(3) {
    position: relative;
    width: 9rem;
    height: 2.7rem;
    font-size: 13px;
    line-height: 2.5rem;
    border-radius: 30px;
    color: #ffffff;
    border: 1px solid #0642ff;
    background: #0642ff;
    margin-top: 20px;
  }
`;
