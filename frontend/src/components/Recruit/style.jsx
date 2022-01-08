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
  align-items: start;
`;
export const Container = styled.div`
  position: relative;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  text-align: center;
  margin-top: 5rem;
`;
export const SaveBtn = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  min-width: 8rem;
  background: #0642ff;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border: none;
  margin: auto;
  margin-top: 3em;
  cursor: pointer;
  z-index: 0;
  &:disabled {
    background: #c4c4c4;
    cursor: default;
  }
  ${fadeIn}
`;

/* Bussiness Profile Select*/

export const NoneContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  & > div:first-child {
    width: 20%;
    border-radius: 50%;
    background-color: rgba(6, 66, 255, 0.05);
    & > img {
      width: 110%;
    }
  }
  & > p:nth-child(2) {
    font-size: 0.9rem;
  }
  & > p:nth-child(3) {
    font-weight: 700;
    color: #0642ff;
  }
  & > div:last-child {
    width: 2rem;
    background-color: rgba(6, 66, 255, 0.2);
    border-radius: 50%;
    margin: 2rem;
    cursor: pointer;
    & > svg {
      width: 2rem;
      path {
        fill: #0642ff;
      }
    }
  }
`;
export const BProfileContainer = styled(Container)`
  & > p:first-child {
    font-size: 1.7rem;
    font-weight: 600;
  }
  & > p:nth-child(2) {
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
  box-sizing: border-box;
  &.selected {
    border: 1px solid #0642ff;
  }
`;
export const BProfileCheck = styled.div`
  display: ${({ display }) => display};
  justify-content: center;
  align-items: center;
  position: absolute;
  transform: translate(8em, 1em);
  width: 2em;
  height: 2em;
  background: #0642ff;
  border-radius: 50%;
  & svg {
    width: 1.3em;
    & path {
      fill: white;
    }
  }
`;

/* Data Select */
export const DataSelectContainer = styled(Container)`
  gap: 2rem;
`;
export const DataSelectHeader = styled.div`
  & > div:first-child {
    width: 10em;
    height: 10em;
    background-size: cover;
    margin: auto;
    background-image: ${({ step }) => {
      if (step === 1) {
        return "url(/images/모집하기위치이미지.png)";
      } else if (step === 2) {
        return "url(/images/모집하기달력이미지.png)";
      } else if (step === 3) {
        return "url(/images/모집하기시간이미지.png)";
      } else if (step === 4) {
        return "url(/images/모집하기유저이미지.png)";
      }
    }};
  }
  & > p:nth-child(2) {
    font-size: 1.7rem;
    font-weight: bold;
  }
`;
export const SelectBox = styled.div`
  display: flex;
  overflow: hidden;
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
  min-width: 10em;
  & > p:first-child {
    white-space: nowrap;
    color: #3f3f3f;
  }
  & input {
    text-align: center;
  }
  ${fadeIn}
`;
export const PlaceBox = styled(Box)`
  & > div:nth-child(2) {
    padding: 0.5rem;
    margin-top: auto;
    justify-content: center;
  }
  & input {
    width: 100%;
  }
`;
export const DateBox = styled(PlaceBox)``;

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

export const TimeSelectBox = styled.div`
  box-shadow: 10px 10px 30px 0px #bdbdbd33;
  border: 1px solid #c4c4c4;
  border-radius: 1em;
  position: absolute;
  z-index: 9;
  background: white;
  transform: translate(-1em, 4.5em);
  display: flex;
  flex-direction: column;
  & > div:first-child {
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 0.8em;
  }
  ${fadeIn}
`;

export const TimeInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  & > div:first-child {
    display: flex;
    width: 100%;
    & p {
      flex: 1;
      text-align: start;
    }
  }
  & > div:nth-child(2) {
    display: flex;
    background: #f8f8f8;
    padding: 0.5em;
    border-radius: 1em;
    & > span:first-child {
      border-right: 0.5px solid #7c7c7c;
    }
  }
  & input {
    background: none;
    border-radius: 1em;
    border: none;
    width: 8rem;
    padding: 0.5rem;
    font-size: 1rem;
    color: black;
    text-align: center;
    outline: none;
  }
`;
export const DetailTimeBtn = styled.button`
  border-radius: 1rem;
  border: none;
  padding: 1em;
  color: #0642ff;
  background: #d6dfff;
  cursor: pointer;
  &:disabled {
    background: #d7d7d7;
    color: #c4c4c4;
    cursor: inherit;
  }
`;
export const SaveTimeBtn = styled.div`
  border-top: 2px dotted #c4c4c4;
  padding: 1rem;
  cursor: pointer;
  color: #0642ff;
  font-weight: bold;
  font-size: 1.2em;
`;
export const CategoryContainer = styled.div`
  & > div:first-child {
    margin: 1rem auto;
    max-width: 50rem;
    background: white;
    box-shadow: 10px 10px 30px 0px #bdbdbd33;
    border-radius: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    gap: 0.5rem;
    padding: 1rem;
  }
`;
export const CategoryBtn = styled.button`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 8rem;
  min-height: 3em;
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

/* Info Data */
export const InputPage = styled(Page)`
  z-index: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 10rem;
`;
export const DataInfoContainer = styled.div`
  width: 100%;
  margin: 4em 0;
  & > p:first-child {
    margin: 1.5em 0;
    font-size: 1.7em;
    font-weight: bold;
  }
  & > div:nth-child(3) {
    display: flex;
    flex-wrap: wrap;
    gap: 5rem;
  }
`;
export const SelectRadio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  & > input {
    display: none;
    font-size: 1em;
  }
  & > label {
    display: block;
    width: 10em;
    height: 10em;
    background: ${({ background }) => background} no-repeat center
      center/contain;
    background-size: cover;
    box-shadow: 0px 4px 4px 0px #223d8540 inset;
    border-radius: 1em;
    border: 1px solid white;
    cursor: pointer;
  }
  & > input:checked + label {
    border: 1px solid #0642ff;
  }
  & > p {
    color: #c4c4c4;
  }
  & > input:checked ~ p {
    white-space: nowrap;
    color: #0642ff;
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
    font-size: 1em;
    background: #f8f8f8;
    padding: 0 15px 0 15px;
  }
  & > input:focus {
    outline: none;
  }
`;
export const InputBox = styled.div`
  flex: 1;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  min-width: 20em;
  & > p:first-child {
    font-size: 1.5rem;
  }
`;
export const TitleBox = styled(InputBox)`
  & > input:nth-child(2) {
    width: 100%;
    height: 3em;
    border-radius: 15px;
    border: none;
    font-size: 1em;
    background: #f8f8f8;
    padding: 0 1em;
  }
`;
export const ContentBox = styled(InputBox)`
  & > textarea:nth-child(2) {
    width: 100%;
    height: 9em;
    border-radius: 15px;
    border: none;
    font-size: 1em;
    background: #f8f8f8;
    padding: 1em 0.5rem;
  }
`;
export const ConditionBox = styled(InputBox)`
  flex: 1;
  & > div:nth-child(2) {
    display: flex;
    gap: 1em;
    width: 100%;
    justify-content: space-around;
  }
  & > div:nth-child(3) {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
`;
export const PaymentBox = styled(InputBox)`
  flex: 1;
  & > div:nth-child(2) {
    display: flex;
    gap: 1rem;
    width: 100%;
    justify-content: space-around;
  }
`;
export const CacheBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const WageBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  gap: 0.2em;
  min-height: 2.4em;
  & > div:first-child {
    color: #ff3737;
  }
  & > p:nth-child(2) {
    color: #0642ff;
    text-align: end;
    margin-top: auto;
  }
`;

export const AddConditionBtn = styled.button`
  margin-left: auto;
  width: min-content;
  white-space: nowrap;
  border: none;
  background: none;
  color: #0642ff;
  cursor: pointer;
  & > svg {
    width: 0.7em;
    & path {
      fill: #0642ff;
    }
  }
  &:disabled {
    display: none;
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
export const ExtraInfoContainer = styled.div`
  width: 100%;
  & > p:first-child {
    margin: 1.5em 0;
    font-size: 1.7em;
    font-weight: bold;
  }
  & > div:nth-child(2) {
    display: flex;
    flex-wrap: wrap;
    gap: 5rem;
  }
`;
export const ImgForm = styled.div`
  display: flex;
  width: 100%;
  overflow-x: scroll;
  & > div {
    display: flex;
    flex-wrap: nowrap;
    gap: 1rem;
    padding: 1em;
  }
  ::-webkit-scrollbar {
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #c4c4c4;
  }
`;

export const ImgBox = styled.div`
  position: relative;
  background: #f8f8f8;
  box-shadow: 10px 10px 30px rgba(189, 189, 189, 0.2);
  border: rgba(189, 189, 189, 0.2) 0.5px solid;
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

/* Thumbnail */
export const ThumbnailContainer = styled.div`
  width: 100%;
  margin-bottom: 10rem;
  & > p:first-child {
    margin: 1.5em 0;
    font-size: 1.7em;
    font-weight: bold;
  }
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
  flex-wrap: wrap;
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
export const PaymentTag = styled.div`
  color: #505050;
  & > span {
    color: ${({ payment }) => (payment === "CACHE" ? "#00BB34" : "#3558C7")};
  }
`;
