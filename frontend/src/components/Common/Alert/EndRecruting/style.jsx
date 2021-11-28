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
  width: 24rem;
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
  gap: 0.625rem;
  justify-content: center;
  align-items: center;
  padding: 1.25rem;

  & > svg {
    width: 2rem;
    height: 2rem;
    path {
      fill: #0642ff;
    }
  }

  & > p:nth-child(2) {
    font-size: 1.5rem;
    text-align: center;
    line-height: 2.5rem;
    font-weight: 700;
    width: 25rem;
  }

  & > p > span:nth-child(2) {
    color: #0642ff;
  }

  & > button:nth-child(3) {
    position: relative;
    width: 6rem;
    height: 1.9rem;
    font-size: 0.8125rem;
    line-height: 1.7rem;
    border-radius: 1.875rem;
    color: #ffffff;
    border: 1px solid #0642ff;
    background: #0642ff;
    margin-top: 1rem;
    cursor: pointer;
  }
`;
