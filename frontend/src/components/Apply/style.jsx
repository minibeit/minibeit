import styled, { css, keyframes } from "styled-components";

const fadeIn = keyframes`
  from{
    opacity:0;
  }
  to{
    opacity:1;
  }
`;

export const ListPageContainer = styled.div`
  margin: 4rem 13rem;
  min-height: 70vh;
  & > div:nth-child(2) {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid #c4c4c4;
    align-items: center;
  }
`;
export const FilterBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: white;
  border: 1px solid #c4c4c4;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  min-width: 7rem;
  & svg {
    width: 1rem;
  }
`;
export const SearchResult = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin: 3rem 0 0.5rem 0;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;
export const FilterLabelBox = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  min-height: 3rem;
`;
export const FilterLabel = styled.div`
  background: rgba(6, 66, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  height: fit-content;
  & > p {
    white-space: nowrap;
  }
  & > button {
    background: none;
    border: none;
    margin: auto;
    display: flex;
    cursor: pointer;
    padding: 0;
    color: #1c2362;
    & svg {
      width: 1em;
    }
  }
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

export const CategoryBox = styled.div`
  overflow-x: scroll;
  padding: 0.5em 0;
  & > p:first-child {
    color: #989898;
    padding: 0.3em 0;
    margin-top: 1.5em;
  }
  ::-webkit-scrollbar {
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: gray;
  }
  & > div {
    display: flex;
    gap: 0.5em;
  }
`;
export const CategoryBtn = styled.button`
  white-space: nowrap;
  min-width: 7em;
  min-height: 3em;
  border-radius: 1em;
  border: 1px solid #c4c4c4;
  cursor: pointer;
`;

/*search filter*/
export const SearchBox = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;
  & > p:first-child {
    font-size: 1.5em;
    font-weight: bold;
  }
  & > div:nth-child(2) {
    display: flex;
    gap: 10px;
    background: #f8f8f8;
    border-radius: 0.3em;
    overflow: hidden;
  }
`;
export const SearchInput = styled.div`
  flex-wrap: wrap;
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 0.5em;
`;
export const InputItem = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 10em;
  gap: 0.5em;
  padding: 0.5em;
  & > p {
    color: #3f3f3f;
  }
  & input {
    width: 100%;
    text-align: center;
    border: none;
    background: none;
    color: black;
    outline: none;
    cursor: pointer;
    font-size: 1em;
  }
`;
export const SearchBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0.5;
  min-width: 6em;
  min-height: 4em;
  color: white;
  background: #0642ff;
  border: none;
  cursor: pointer;
  & svg {
    width: 1.5em;
    & path {
      fill: white;
    }
  }
`;

/* detail filter */
export const FilterBox = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: absolute;
  max-width: 35rem;
  background-color: white;
  border: 1px solid #c4c4c4;
  border-radius: 15px;
  text-align: center;
  z-index: 99;
  & > div:first-child {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    & > p {
      font-weight: bold;
      font-size: 1.2em;
    }
    & svg {
      margin-left: auto;
      cursor: pointer;
    }
  }
  & > p:nth-child(2) {
    text-align: start;
    padding: 0 0.5rem;
  }
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;
export const FilterResetBtn = styled.div`
  margin: 1rem;
  cursor: pointer;
  font-size: 1em;
  color: #8c8c8c;
`;

export const Box = styled.div`
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: all 500ms;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: all 300ms;
  }
`;

export const DetailBox = styled(Box)`
  text-align: start;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1em;
  & > p:first-child {
    font-size: 1rem;
    font-weight: bold;
  }
  & > div:nth-child(2) {
    display: flex;
    gap: 0.5em;
  }
`;
export const PaymentBtn = styled.button`
  background: white;
  border: 1px solid #c4c4c4;
  cursor: pointer;
  color: black;
  padding: 0.5em 3em;
  border-radius: 0.5rem;
  white-space: nowrap;
  &:disabled {
    border: 1px solid #0642ff;
    background: #b4c6ff;
  }
`;
export const SelectBtn = styled(PaymentBtn)`
  padding: 0.5em 0.5em;
  min-width: 5em;
`;
export const FilterSaveBtn = styled.button`
  width: 100%;
  height: 3rem;
  background: #0642ff;
  border: none;
  font-size: 15px;
  font-weight: bold;
  border-radius: 0 0 15px 15px;
  color: white;
  cursor: pointer;
`;

/*list*/
export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

export const FeedBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 12em;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #c4c4c480;
  box-sizing: content-box;
  border-radius: 1em;
  box-shadow: 2px 2px 12px 0px #00000033;
  &:hover {
    transform: scale(1.01);
  }
`;

export const FeedImgView = styled.div`
  background-image: ${({ thumbnail }) =>
    thumbnail ? `url(${thumbnail})` : 'url("/images/기본프로필.png")'};
  background-size: cover;
  background-position: center;
  flex: 1;
  min-width: 16em;
  min-height: 10em;
  & > div:first-child {
    display: flex;
    flex: 1;
    height: 100%;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 0.3em;
    padding: 1em;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 9;
  }
`;
export const FeedBookmark = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  text-align: center;
  color: white;
  & svg {
    width: 1em;
    & path {
      fill: white;
    }
  }
`;

export const FeedContentView = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  height: auto;
  padding: 1.5em;
  max-width: 35em;
  gap: 0.5em;
`;
export const FeedHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  & > p:first-child {
    font-size: 1.5em;
    font-weight: bold;
  }
  & > div:nth-child(2) {
    display: flex;
    gap: 0.4em;
    color: #8e8e8e;
    & svg {
      width: 1em;
      & path {
        fill: #8e8e8e;
      }
    }
  }
`;
export const FeedInfoData = styled.div`
  display: flex;
  gap: 1em;
  margin-top: auto;
  & > div {
    white-space: nowrap;
    display: flex;
    gap: 0.5em;
    align-items: center;
  }
  & > div:first-child {
    color: #8c8c8c;
  }
`;
export const Tag = styled.div`
  border-radius: 4px;
  width: fit-content;
  padding: 0.3em 1em;
  background: #7c7c7c1a;
  color: #7c7c7c;
  white-space: nowrap;
`;
export const RecruitTag = styled(Tag)`
  ${({ recruit }) => {
    return recruit
      ? css`
          background: rgba(123, 104, 255, 0.1);
          color: #7b68ff;
        `
      : css`
          background: #7c7c7c1a;
          color: #7c7c7c;
        `;
  }}
`;
export const PaymentBox = styled.div`
  color: #505050;
  min-width: 15em;
  & > span {
    color: ${({ payment }) => (payment === "CACHE" ? "#00BB34" : "#3558C7")};
  }
`;
