import styled from "styled-components";

export const AlertBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  width: 30rem;
  height: 30rem;
  border-radius: 35px;
  padding: 0 1rem;
  @media only screen and (max-width: 700px) {
    padding: 1rem;
    width: 19rem;
    height: 21rem;
  }
`;

export const AlertContent = styled.div`
  transform: translate(-50%, -30%);
  position: absolute;
  top: 30%;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  justify-content: center;
  align-items: left;

  & > div:first-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    width: 25rem;
  }

  & > div > p:first-child {
    font-size: 20px;
    text-align: left;
    font-weight: 700;
  }

  & > div > div:nth-child(2) {
    font-size: 1.5rem;
    padding: 1rem 0;
    cursor: pointer;
  }

  & > div:nth-child(2) {
    position: relative;
    display: flex;
    justify-content: left;
    background-color: #f9f9f9;
    border-radius: 17px;
    font-size: 15px;
    line-height: 20px;
    width: 25rem;
    height: 22rem;
  }
  & > div:nth-child(2) > p:first-child {
    margin: 15px;
    font-size: 10px;
    text-align: left;
    line-height: 15px;
    width: 24rem;
    height: 21rem;
    overflow-y: scroll;
    overflow-x: auto;
    font-weight: 400;
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: gray;
    }
    ::-webkit-scrollbar-button {
      width: 0;
      height: 0;
    }
  }

  @media only screen and (max-width: 700px) {
    transform: translate(-50%, 0);
    top: 0;
    gap: 1.5em;
    margin-top: 1rem;
    & > div:first-child {
      width: 19rem;
    }
    & > div:nth-child(2) {
      width: 18rem;
      height: 15rem;
    }
    & > div:nth-child(2) > p:first-child {
      width: 18rem;
      height: 14rem;
    }
  }
`;
