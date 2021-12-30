import styled from "styled-components";

export const ModalBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  width: 30rem;
  height: 22rem;
  border-radius: 2.2rem;
  & > svg {
    position: relative;
    cursor: pointer;
    float: right;
    margin: 1.5rem;
    width: 1rem;
    height: 1rem;
  }
`;

export const ModalContent = styled.div`
  transform: translate(-50%, -60%);
  position: absolute;
  top: 60%;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 20px;

  & > svg {
    width: 2rem;
    height: 2rem;
    path {
      fill: #0642ff;
    }
  }

  & > p:nth-child(2) {
    font-weight: 700;
    width: 25rem;
    font-size: 1.6rem;
    text-align: center;
    line-height: 1.875rem;
    margin-bottom: 1rem;
    & span {
      color: #0642ff;
    }
  }

  & > div > div:nth-child(2) {
    position: absolute;
    z-index: 2;
    background: #fff;
    border-radius: 0.625rem;
  }
`;

export const Select = styled.div`
  position: relative;
  width: 20rem;
  height: 1.2rem;
  padding: 0.375rem 0;
  font-size: 0.6875rem;
  line-height: 1.2rem;
  border: 1px solid #0642ff;
  border-bottom: ${({ isActive }) => {
    return isActive ? "none" : "1px solid #0642FF";
  }};
  border-radius: ${({ isActive }) => {
    return isActive ? "0.625rem 0.625rem 0 0" : "10px";
  }};
  text-align: center;
  color: #0642ff;
  cursor: pointer;
  & > span:first-child {
    position: absolute;
    right: 0.625rem;
    ${({ isActive }) => {
      return isActive ? "transform: rotate(180deg)" : null;
    }}
  }
`;

export const Option = styled.option`
  background-color: #fff;
  width: 20rem;
  height: 1.2rem;
  padding: 0.375rem 0;
  font-size: 0.625rem;
  line-height: 1.1rem;
  border: 1px solid gray;
  text-align: center;
  color: #8c8c8c;
  cursor: pointer;
  &:hover {
    color: #0642ff;
  }
  &:not(:last-child) {
    border-bottom: none;
  }
  &:not(:first-child) {
    border-top: none;
  }
  &:last-child {
    border-radius: 0 0 0.625rem 0.625rem;
    color: lightgray;
  }
  &:not(:last-child):after {
    content: "";
    position: relative;
    display: block;
    border-bottom: 1px solid rgba(140, 140, 140, 0.3);
    left: 50%;
    transform: translateX(-50%);
    width: 17rem;
    text-align: center;
    padding-bottom: 0.375rem;
  }
`;

export const Input = styled.input`
  width: 20rem;
  height: 2rem;
  padding: 0.375rem 0;
  font-size: 0.6875rem;
  line-height: 0.6875rem;
  border: 1px solid #0642ff;
  border-radius: 0.625rem;
  text-align: center;
  color: #0642ff;
  box-sizing: border-box;
  :focus {
    border: 1px solid gray;
    color: gray;
  }
`;

export const BlueButton = styled.button`
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
`;
