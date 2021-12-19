import styled, { css } from "styled-components";

const fadeIn = () => {
  return css`
    &.fadeIn-enter {
      opacity: 0;
    }
    &.fadeIn-enter-active {
      opacity: 1;
      transition: opacity 500ms linear;
    }
    &.fadeIn-exit {
      opacity: 1;
    }
    &.fadeIn-exit-active {
      opacity: 0;
      transition: opacity 500ms linear;
    }
  `;
};

/* Common */
export const Page = styled.div`
  min-height: 100vh;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Container = styled.div`
  position: relative;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  text-align: center;
`;
export const SaveBtn = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  background: #0642ff;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border: none;
  margin: auto;
  cursor: pointer;
  z-index: 0;
  &:disabled {
    background: #c4c4c4;
    cursor: default;
  }
`;

/* Bussiness Profile Select*/
export const BProfileContainer = styled(Container)`
  & > p:first-child {
    font-size: 2rem;
    font-weight: 600;
  }
  & > p:nth-child(2) {
    font-size: 2rem;
    font-weight: 600;
  }
  & > p:nth-child(3) {
    color: #c4c4c4;
  }
`;
export const BProfileListBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
export const BProfileImgBox = styled.div`
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  width: 10rem;
  height: 10rem;
  cursor: pointer;
  background-color: rgba(6, 66, 255, 0.5);
  &.selected {
    transform: scale(1.2);
  }
  &.selected img {
    mix-blend-mode: color-burn;
  }
`;

/* Data Select */
export const DataSelectContainer = styled(Container)`
  gap: 2rem;
  transform: translate(0, -2rem);
`;
export const DataSelectHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  & > p {
    font-size: 2rem;
  }
  & > p:first-child {
    font-weight: bold;
  }
`;
export const SelectBox = styled.div`
  display: flex;
  max-width: 80%;
  align-self: center;
  flex-wrap: wrap;
  gap: 0.2rem;
  border-radius: 1rem;
`;
export const Box = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 4rem;
  gap: 0.5rem;
  background: #f8f8f8;
  padding: 0.5rem 1rem;
  & > p:first-child {
    white-space: nowrap;
  }
  ${fadeIn}
`;
export const PlaceBox = styled(Box)`
  flex: 1.5;
  border-radius: 1em 0 0 1em;
  & > div:nth-child(2) {
    padding: 0.5rem;
    margin-top: auto;
  }
`;
export const DateBox = styled(Box)`
  flex: 0.8;
  & > div:nth-child(2) {
    display: flex;
    margin-top: auto;
    margin-bottom: 0.5em;
    gap: 0.3rem;
    & input {
      padding: 0.5rem;
      font-size: 15px;
      max-width: 9rem;
      border: none;
      background: none;
      outline: none;
    }
  }
  & svg {
    width: 1.5rem;
  }
`;

export const CountBox = styled(Box)`
  & > div:nth-child(2) {
    display: flex;
    margin-top: auto;
    margin-bottom: 0.5em;
    & > p:nth-child(2) {
      flex: 1;
      white-space: nowrap;
      font-weight: bold;
    }
    & > button {
      display: flex;
      border: none;
      background: none;
      cursor: pointer;
    }
  }
  & svg {
    width: 1rem;
  }
`;
export const HeadCountBox = styled(CountBox)`
  border-radius: 0 1em 1em 0;
`;
export const TimeSelectBox = styled.div`
  box-shadow: 10px 10px 30px 0px #bdbdbd33;
  position: absolute;
  z-index: 9;
  background: white;
  transform: translate(0, 4em);
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  & > div:first-child {
    padding: 0.5em;
    display: flex;
    flex-direction: column;
    gap: 0.8em;
    & > div:first-child {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5em;
    }
  }
  ${fadeIn}
`;
export const TimeInput = styled.div`
  display: flex;
  flex-direction: column;
  & p {
    text-align: start;
    margin: 0.3em;
  }
  & input {
    background: #f8f8f8;
    border-radius: 1em;
    border: none;
    width: 8rem;
    padding: 0.5rem;
    font-size: 1rem;
    color: #7c7c7c;
    font-weight: bold;
    text-align: center;
  }
`;
export const DetailTimeBtn = styled.button`
  border: 1px solid #0642ff;
  border-radius: 1rem;
  padding: 1em;
  color: #0642ff;
  background: none;
  cursor: pointer;
  &:disabled {
    border: 1px solid #c4c4c4;
    color: #c4c4c4;
    cursor: inherit;
  }
`;
export const SaveTimeBtn = styled.div`
  border-top: 1px dotted #c4c4c4;
  padding: 1rem;
  cursor: pointer;
  color: #0642ff;
  font-weight: bold;
  font-size: 1.2em;
`;
export const NextBtn = styled.button`
  width: fit-content;
  align-self: end;
  padding: 0.5rem 1rem;
  white-space: nowrap;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  color: #0642ff;
  background: none;
  display: flex;
  gap: 0.3em;
  align-items: center;
  cursor: pointer;
  ${fadeIn}
`;
export const CategoryContainer = styled.div`
  & > p:first-child {
    color: #c4c4c4;
  }
  & > div:nth-child(2) {
    margin: 1rem auto;
    max-width: 50rem;
    background: white;
    box-shadow: 10px 10px 30px 0px #bdbdbd33;
    border-radius: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
  }
  ${fadeIn}
`;
export const CategoryBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 8rem;
  border: none;
  background: #f8f8f8;
  padding: 0.5rem 0;
  border-radius: 10px;
  cursor: pointer;
  color: black;
  border: 1px solid#f8f8f8;
  &:disabled {
    border: 1px solid #0642ff;
    background: white;
  }
`;
export const CategoryConfirm = styled(CategoryBtn)`
  gap: 0.5rem;
  border: none;
  background: none;
  & p {
    font-weight: bold;
    color: #0642ff;
  }
  & svg {
    width: 1rem;
    transform: rotate(270deg);
    & path {
      fill: #0642ff;
    }
  }
  :disabled {
    border: none;
    & p {
      font-weight: bold;
      color: #c4c4c4;
    }
    & svg {
      & path {
        fill: #c4c4c4;
      }
    }
  }
`;

/* Info Data */
export const InputPage = styled(Page)`
  padding: 10rem 0;
  z-index: 1;
`;
export const InputContainer = styled(Container)`
  & > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem 0;
    & > button {
      border: none;
      padding: 0;
      background: none;
      color: #7c7c7c;
      font-size: 0.9rem;
      cursor: pointer;
      display: flex;
      align-items: baseline;
      & > svg {
        width: 0.9rem;
        margin-right: 0.3rem;
        transform: rotate(90deg);
        path {
          fill: #7c7c7c;
        }
      }
    }
    & > p {
      color: #0642ff;
    }
  }
`;
export const Input = styled.div`
  width: 100%;
  border-radius: 15px;
  border: none;
  background: #f8f8f8;
  display: flex;
  & > input {
    width: 100%;
    height: 3em;
    border-radius: 15px;
    border: none;
    font-size: 21px;
    background: #f8f8f8;
    padding: 0 15px 0 15px;
  }
  & > input:focus {
    outline: none;
  }
`;
export const InputBox = styled.div`
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  & > p:first-child {
    font-size: 2rem;
    font-weight: bold;
  }
  & > p:nth-child(2) {
    font-size: 1.1rem;
    margin: 1rem 0 0.5rem;
  }
`;
export const TitleBox = styled(InputBox)`
  & > input:nth-child(2) {
    width: 100%;
    height: 3em;
    border-radius: 15px;
    border: none;
    font-size: 21px;
    background: #f8f8f8;
  }
`;
export const ContentBox = styled(InputBox)`
  & > textarea:nth-child(2) {
    width: 100%;
    height: 6em;
    border-radius: 15px;
    border: none;
    font-size: 21px;
    background: #f8f8f8;
    padding: 1rem 0;
  }
`;
export const ConditionBox = styled(InputBox)`
  & > div:first-child {
    display: flex;
    font-size: 2rem;
    font-weight: bold;
  }
`;
export const ConditionInput = styled(Input)`
  & > button {
    background: none;
    display: flex;
    border: none;
    align-items: center;
    color: #0642ff;
    cursor: pointer;
  }
  & > button:disabled {
    color: #c4c4c4;
  }

  & svg {
    width: 1rem;
    & path {
      fill: ${({ disabled }) => (disabled ? "#c4c4c4" : "#0642ff")};
    }
  }
`;
export const PaymentBox = styled(InputBox)`
  & > div:first-child {
    display: flex;
    font-size: 2rem;
    font-weight: bold;
    gap: 1rem;
  }
`;
export const CacheBox = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    & > p {
      text-align: start;
      font-size: 1rem;
    }
  }
`;
export const PayInput = styled(Input)`
  & > span {
    display: flex;
    align-items: center;
    font-size: 21px;
    font-weight: bold;
    color: #c4c4c4;
    padding: 0 1rem;
  }
`;

/* img and address */
export const ImgForm = styled.div`
  display: flex;
  width: 100%;
  & > div {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

export const ImgBox = styled.div`
  background: #ffffff;
  box-shadow: 10px 10px 30px rgba(189, 189, 189, 0.2);
  border: rgba(189, 189, 189, 0.2) 0.5px solid;
  overflow: hidden;
  width: 13rem;
  height: 13rem;
  display: inline-block;
`;
export const ThumbnailTag = styled.div`
  position: absolute;
  background: #e5ecff;
  border-radius: 0.2em;
  padding: 0.2em 0.7em;
  color: #0642ff;
  transform: translate(0.5em, 0.5em);
`;

export const DeleteImg = styled.button`
  position: absolute;
  transform: translate(14em, -1em);
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  color: white;
  background: #272727;
  cursor: pointer;
`;
export const Img = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
`;
export const FileLabel = styled.label`
  background: #ffffff;
  box-shadow: 10px 10px 30px rgba(189, 189, 189, 0.2);
  border: rgba(189, 189, 189, 0.2) 0.5px solid;
  overflow: hidden;
  width: 13rem;
  height: 13rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & > svg {
    width: 3em;
    & path {
      fill: #dedede;
    }
  }
`;
export const FileInput = styled.input`
  display: none;
`;
