import styled from "styled-components";

export const ModalBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  width: 30rem;
  height: 22rem;
  padding: 1rem;
  border-radius: 2.2rem;
  & > div:first-child {
    display: flex;
    justify-content: flex-end;
    margin: 1.5rem;
    cursor: pointer;
    & > svg {
      width: 1rem;
      height: 1rem;
    }
  }

  @media only screen and (max-width: 700px) {
    width: 20rem;
    height: 16rem;
    & > div:first-child {
      margin: 0.7rem;
    }
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
  justify-content: space-around;
  align-items: center;
  max-height: 22rem;
  min-height: 18rem;

  @media only screen and (max-width: 700px) {
    max-height: 18rem;
    min-height: 14rem;
    gap: 0.7rem;
    padding: 0;
  }
`;
export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  margin-bottom: 1rem;
  & > svg {
    width: 2rem;
    height: 2rem;
    path {
      fill: #0642ff;
    }
  }
  & > p:nth-child(2) {
    font-size: 1.7rem;
    line-height: 2rem;
    white-space: nowrap;
    font-weight: bold;
  }
  & > p:nth-child(3) {
    font-weight: bold;
  }
  & > p:nth-child(4) {
    color: #c4c4c4;
    font-size: 0.8rem;
  }
  @media only screen and (max-width: 700px) {
    margin-bottom: 1rem;
    gap: 0.8rem;
    & > p:nth-child(2) {
      font-size: 1.5rem;
    }
  }
`;
export const ButtonBox = styled.div`
  display: flex;
  gap: 2rem;
  & > button {
    width: 10em;
    height: 3em;
    border: 1px solid #0642ff;
    border-radius: 3rem;
    background: none;
    color: #0642ff;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }
  @media only screen and (max-width: 700px) {
    gap: 1rem;
    & > button {
      width: 8em;
      height: 2.5em;
      border: 1px solid #0642ff;
      border-radius: 3rem;
      background: none;
      color: #0642ff;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

export const SelectBox = styled.div`
  margin-bottom: 1rem;
  margin-top: 3rem;
  height: 2rem;
  position: absolute;
  z-index: 2;
  background-color: #fff;
`;
export const Select = styled.div`
  position: relative;
  width: 20rem;
  height: 1.2rem;
  padding: 0.375rem 0;
  font-size: 0.8rem;
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
      return !isActive ? "transform: rotate(180deg)" : null;
    }}
  }

  @media only screen and (max-width: 700px) {
    width: 18rem;
  }
`;

export const Option = styled.option`
  background-color: #fff;
  width: 20rem;
  height: 1.2rem;
  padding: 0.375rem 0;
  font-size: 0.8rem;
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

  @media only screen and (max-width: 700px) {
    width: 18rem;
  }
`;
