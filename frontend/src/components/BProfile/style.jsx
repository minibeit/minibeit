import styled, { css, keyframes } from "styled-components";

/* Common */

const fadeIn = keyframes`
  from{
    opacity:0
  }
  to{
    opacity:1;
  }
`;

const pushUp = keyframes`
 from {
   opacity: 0.3;
   width:0;
 }

 to{
   opacity: 1;
   width: ${({ width }) => width};
 }
`;

export const ModeSelectBtn = styled.button`
  background: #e5e5e5;
  border: none;
  cursor: pointer;
  padding: 0.5rem 4rem;
  border-radius: 0.5rem 0.5rem 0 0;
  font-weight: bold;
  &:disabled {
    background: white;
    color: black;
  }
  @media only screen and (max-width: 700px) {
    padding: 0.5rem 2rem;
  }
`;
export const Container = styled.div`
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 100vh;
`;
export const ImgBox = styled.div`
  overflow: hidden;
  width: 8.5rem;
  height: 8.5rem;
  display: inline-block;
  border-radius: 50%;
  @media only screen and (max-width: 700px) {
    width: 6.5rem;
    height: 6.5rem;
  }
`;
export const SImgBox = styled(ImgBox)`
  width: 6.5rem;
  height: 6.5rem;
`;

/* user */

export const UserInfoContainer = styled.div`
  flex: 1;
  margin: 2rem 1.5rem;
  min-width: 18rem;
  & > div:first-child {
    border: 1px solid #c4c4c4;
    border-radius: 1em;
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    animation: ${fadeIn} 0.7s ease-in;
    & > div:first-child {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;

      & > div:first-child {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
      }
      & > div:nth-child(2) {
        display: flex;
        flex: 1;
        width: 14rem;
        gap: 1rem;
        flex-direction: column;
        & > button:nth-child(2) {
          display: none;
        }
      }
    }
  }

  @media only screen and (max-width: 700px) {
    margin: 1rem auto;
    max-width: 80%;
    & > div:first-child {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      & > div:first-child {
        display: flex;
        padding: 0;
        flex-direction: row;
        gap: 1rem;
        align-items: center;
        & > div:nth-child(2) {
          width: 100%;
          & > button:first-child {
            display: none;
          }
          & > button:nth-child(2) {
            display: inline;
          }
        }
      }
    }
  }
`;
export const ChangeBProfile = styled.div`
  font-size: 0.8rem;
  cursor: pointer;
  color: #7c7c7c;
  display: flex;
  gap: 0.5em;
  & svg {
    width: 0.8rem;
    transform: rotate(270deg);
    & path {
      fill: #7c7c7c;
    }
  }
`;
export const UserInfoData = styled.div`
  display: flex;
  gap: 0.5em;
  & > p:first-child {
    font-weight: bold;
  }
  & > p:nth-child(2) {
    color: #c4c4c4;
    font-weight: bold;
  }
`;

export const UserInfoBtn = styled.button`
  width: 100%;
  padding: 0.7rem;
  border-radius: 2rem;
  color: black;
  font-size: 1em;
  cursor: pointer;
  @media only screen and (max-width: 700px) {
    padding: 0.5rem 1rem;
    font-size: 0.9em;
  }
`;
export const InfoEditBtn = styled(UserInfoBtn)`
  border: 1px solid #c4c4c4;
  background: white;
`;
export const InfoEditBtnFM = styled(UserInfoBtn)`
  border: 1px solid #c4c4c4;
  background: white;
`;
export const UserListBtn = styled(UserInfoBtn)`
  border: none;
  background: #f8f8f8;
`;

export const FeedPreviewBox = styled.div`
  width: 100%;
  border-top: 1px solid #c4c4c4;
  & > p {
    font-size: 1.5em;
    font-weight: bold;
    padding: 0.5em 0;
  }
  & > div:nth-child(2) {
    width: 100%;
    background: #0642ff0d;
    border-radius: 1em;
    min-height: 5em;
    padding: 2em;
    box-sizing: border-box;
  }
  @media only screen and (max-width: 700px) {
    & > p {
      font-size: 1.2em;
      line-height: 2rem;
    }
    & > div:nth-child(2) {
      padding: 1em;
    }
  }
`;
export const PreviewTable = styled.table`
  width: 100%;
  & td {
    text-align: center;
    font-weight: bold;
  }
  & > thead > tr td {
    font-size: 1.2em;
  }
  & > tbody > tr td {
    font-size: 1.5em;
    color: #0642ff;
    height: 2em;
    vertical-align: middle;
  }
`;

export const FeedContainer = styled.div`
  flex: 3.5;
  padding: 1rem 1rem 1rem 0;
  @media only screen and (max-width: 700px) {
    padding: 1rem 0;
  }
`;
export const CategoryBtnBox = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  white-space: nowrap;
  & button {
    cursor: pointer;
    background: white;
    border: none;
    border-bottom: 2px solid #c4c4c4;
    font-size: 1rem;
    font-weight: bold;
    color: #cccccc;
    padding: 0.3em 0.5em;
  }
  & button:disabled {
    color: black;
    border-bottom: 2px solid #0642ff;
  }

  @media only screen and (max-width: 700px) {
    padding: 1rem 0.2rem;
    & button {
      font-size: 0.9rem;
      padding: 0.3em 0.2em;
    }
  }
`;
export const NoneDiv = styled.div`
  max-width: 30em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
`;
export const FeedGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  animation: ${fadeIn} 0.7s ease-out;
  @media only screen and (max-width: 700px) {
    padding: 0rem;
    align-items: flex-start;
  }
`;
export const FeedBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #c4c4c480;
  box-sizing: content-box;
  border-radius: 1em;
  box-shadow: 2px 2px 12px 0px #00000033;
  background: ${({ postStatus, status }) => {
    if (status === "like" && postStatus === "COMPLETE") return "#b4b4b4";
    else return "#fff";
  }};
  &:hover {
    transform: scale(1.01);
    & > div:first-child {
      display: none;
    }
  }
  @media only screen and (max-width: 700px) {
    margin: 0 auto;
    width: 90%;
  }
`;

export const FeedLabel = styled.div`
  position: absolute;
  transform: translate(0.3rem, -0.7rem);
  z-index: 1;
  padding: 0.3rem;
  text-align: center;
  border-radius: 2rem;
  ${({ status }) => {
    if (status === "생성한 모집공고")
      return css`
        color: #7b68ff;
        border: 1px solid #7b68ff;
      `;
    else if (status === "완료된 모집공고")
      return css`
        color: #16b4ab;
        border: 1px solid #16b4ab;
      `;
    else return null;
  }}
  background: #fff;
  font-size: 0.85rem;
`;

export const FeedImgView = styled.div`
  background-image: ${({ thumbnail }) =>
    thumbnail ? `url(${thumbnail})` : 'url("/images/기본프로필.png")'};
  background-size: cover;
  background-position: center;
  flex: 1;
`;

export const FeedTitle = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 0.3em;
  padding: 2em;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9;
  & > div:first-child {
    display: flex;
    gap: 0.3em;
    font-size: 0.9em;
    color: white;
    & svg {
      width: 0.9em;
      & path {
        fill: white;
      }
    }
  }
  & > p:nth-child(2) {
    color: white;
    font-size: 1.5rem;
  }
  & > p:nth-child(3) {
    color: white;
    font-weight: bold;
    margin-top: auto;
  }
  & > p:nth-child(4) {
    color: white;
    font-size: 0.8rem;
    font-weight: 100;
  }
  @media only screen and (max-width: 700px) {
    gap: 0.5em;
    padding: 2em 1em;
  }
`;

export const FeedContentView = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: -webkit-fill-available;
  height: auto;
  padding: 1em 2em;
  gap: 0.5em;
  width: 100%;
  & > div:first-child {
    flex: 1;
    display: flex;
    gap: 0.5em;
    & > p {
      font-size: 0.85em;
      white-space: nowrap;
    }
    & > p:nth-child(2) {
      font-weight: bold;
    }
  }
  & > div:nth-child(2) {
    min-height: 3em;
    display: flex;
    gap: 0.5em;
    & > p {
      font-size: 0.85em;
      white-space: nowrap;
    }
    & > p:nth-child(2) {
      font-weight: bold;
    }
  }
  & > div:nth-child(3) {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    gap: 1em;
  }

  @media only screen and (max-width: 700px) {
    padding: 1em;
    gap: 0.5em;
    & > div:nth-child(3) {
      justify-content: center;
      & button {
        flex: 1;
        display: flex;
        justify-content: center;
        font-size: 1rem;
      }
    }
  }
`;

export const FeedButton = styled.button`
  display: flex;
  align-items: center;
  border-radius: 2rem;
  font-size: 1.3rem;
  max-height: 2.5rem;
  cursor: pointer;
  white-space: nowrap;
  min-width: fit-content;
  padding: 0.5em 1em;
`;

export const WhiteButton = styled(FeedButton)`
  background: #ffffff;
  border: 1px solid #0642ff;
  color: #0642ff;
  &:hover {
    background: #0642ff;
    border: 1px solid #ffffff;
    color: #ffffff;
  }
`;

export const BlueButton = styled(FeedButton)`
  background: #0642ff;
  border: 1px solid white;
  color: white;
  &:hover {
    background: white;
    border: 1px solid #0642ff;
    color: #0642ff;
  }
`;

/* profile list */

export const BusinessListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  & > p {
    width: 7rem;
    padding: 0.5rem;
    text-align: center;
    background: #c4c4c4;
    border-radius: 2rem;
  }
  & > div {
    display: flex;
    gap: 4rem;
    justify-content: flex-start;
  }
`;

export const BusinessProfile = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  align-items: center;
  text-align: center;
  & > div:first-child {
    cursor: pointer;
    & > p {
      font-size: 0.9rem;
      margin: 0.7rem;
    }
  }
`;

export const AddBProfileBtn = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  display: flex;
  & > svg {
    margin: auto;
    width: 3rem;
    height: 3rem;
  }
`;

/* review page */

export const RevievContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 18rem;
  @media only screen and (max-width: 700px) {
    margin: 0 auto;
    width: 90%;
  }
`;

export const ReviewBar = styled.div`
  width: 100%;
  display: flex;
`;
export const ReviewItem = styled.div`
  text-align: center;
  width: ${({ width }) => width};
  & > div:first-child {
    height: 0.5em;
    background: #0640ffae;
    border: 1px solid white;
  }
`;
export const ReviewInfo = styled.div`
  display: ${({ view }) => view};
  margin: auto;
  width: fit-content;
  & > p:first-child {
    margin: 0.5em 0;
    background: #0642ff1a;
    padding: 0.2em 0.6em;
    border-radius: 0.3em;
    color: #0642ff;
    font-weight: bold;
    white-space: nowrap;
  }
  & > p:nth-child(2) {
    font-weight: bold;
  }
`;
export const ReviewList = styled.div`
  display: flex;
  margin: 1em 0.5em;
  gap: 0.5em;
  & > div:nth-child(3) {
  }
`;
export const ReviewTitle = styled.div`
  display: flex;
  gap: 0.5em;
  & > p {
    font-weight: bold;
    color: #404040;
  }
`;
export const ReviewCount = styled.div`
  display: flex;
  gap: 0.5em;
  & svg {
    width: 1rem;
    & path {
      fill: #0642ff;
    }
  }
  & > p {
    font-weight: bold;
  }
  margin-left: auto;
`;

export const ReviewIconContainer = styled.div`
  width: 100%;
  height: 13rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.5rem;
  background-color: rgba(6, 66, 255, 0.05);
  & > div {
    width: 70%;
    height: 90%;
    position: relative;
    display: flex;
    align-items: center;
    & > div:first-child {
      display: flex;
      justify-content: flex-end;
      align-items: end;
    }
    & > div:last-child {
      & > img {
        margin-bottom: 2rem;
      }
    }
  }
`;
export const ReviewIcomMiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 1rem;
  & > div {
    flex: 1;
    height: 6rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    & > img {
      animation: ${pushUp} 1s ease-in;
      width: ${({ width }) => width};
      /* min-width: 1rem; */
    }
  }
  & > div:first-child {
    display: flex;
    justify-content: center;
    /* margin-left: 1rem; */
  }
`;
export const ReviewIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
  & > img {
    /* min-width: 1rem; */
    animation: ${pushUp} 1s ease-in;
    width: ${({ width }) => width};
  }
`;
