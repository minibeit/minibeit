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
  border-radius: 2.25rem;
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
    width: 2.5rem;
    path {
      fill: #0642ff;
    }
  }
  & > p:nth-child(2) {
    width: 20rem;
    text-align: center;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 2rem;
    & > p {
      font-size: 0.8rem;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);
      line-height: 1.3rem;
    }
  }

  & > button:nth-child(3) {
    position: relative;
    width: 9rem;
    height: 2.7rem;
    font-size: 0.9rem;
    line-height: 2.5rem;
    border-radius: 2rem;
    color: #ffffff;
    border: 1px solid #0642ff;
    background: #0642ff;
    margin-top: 1rem;
    cursor: pointer;
  }
`;
