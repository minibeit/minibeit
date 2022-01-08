import styled, { css, keyframes } from "styled-components";

/* Common */

const fadeIn = keyframes`
  from{
    opacity:0
  }
  to{
    opacity:1
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
  cursor: pointer;
  position: relative;
  @media only screen and (max-width: 700px) {
    width: 6.5rem;
    height: 6.5rem;
  }
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
        }
      }
    }
  }
`;
export const UserNameBox = styled.div`
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
    padding: 0.5rem;
    font-size: 0.9em;
  }
`;
export const ProfileBtn = styled(UserInfoBtn)`
  border: 1px solid #c4c4c4;
  background: white;
`;
export const LikeBtn = styled(UserInfoBtn)`
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

/*like container*/

export const LikeFeedContainer = styled.div`
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
  & > div:first-child {
    display: flex;
    align-items: center;
    color: #c4c4c4;
    cursor: pointer;
    & svg {
      width: 1rem;
      transform: rotate(90deg);
      & path {
        fill: #c4c4c4;
      }
    }
  }
  & > div:nth-child(2) {
    font-size: 1.3rem;
    font-weight: bold;
    padding: 1em 0 0.5em;
    border-bottom: 1.5px solid #afafaf;
  }
  & > div:nth-child(3) {
    padding: 2em 0;
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
  }
`;
export const LikeFeedBox = styled.div`
  min-width: 17em;
  cursor: pointer;
  height: fit-content;
  & > div:first-child {
    width: 100%;
    height: 17em;
    border-radius: 1em;
    overflow: hidden;
  }
  :hover {
    transform: scale(1.01);
  }

  @media only screen and (max-width: 700px) {
    min-width: 15em;
    padding-bottom: 1rem;
    border-bottom: 1px solid #d4d4d4;
    & > div:first-child {
      height: 15em;
    }
  }
`;

export const LikeFeedInfo = styled.div`
  padding: 0.5em;
  & > div:first-child {
    font-size: 1.2rem;
    font-weight: bold;
    color: #454545;
    margin: 0 0 1em 0;
    line-height: 2rem;
  }
  & > div:nth-child(2) {
    font-weight: bold;
    margin: 0 0 0.8em 0;
    color: #454545;
  }
  & > div:nth-child(3) {
    display: flex;
    gap: 1em;
    margin: 0 0 0.5em 0;
    color: #454545;
  }
`;
export const LikePayment = styled.div`
  color: ${({ payment }) => (payment === "CACHE" ? "#00BB34" : "#3558C7")};
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

export const FeedGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  animation: ${fadeIn} 0.7s ease-out;
  @media only screen and (max-width: 700px) {
    padding: 0rem;
    align-items: flex-start;
  }
`;

export const NoneDiv = styled.div`
  max-width: 30em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
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
  z-index: 99;
  padding: 0.3rem;
  text-align: center;
  border-radius: 2rem;
  ${({ status, postStatus }) => {
    if (status === "approve")
      return css`
        color: #7b68ff;
        border: 1px solid #7b68ff;
      `;
    else if (status === "wait")
      return css`
        color: #16b4ab;
        border: 1px solid #16b4ab;
      `;
    else if (status === "complete")
      return css`
        color: #0642ff;
        border: 1px solid #0642ff;
      `;
    else if (status === "reject")
      return css`
        color: #ff0606;
        border: 1px solid #ff0606;
      `;
    else if (status === "like" && postStatus === "RECRUIT")
      return css`
        color: #0642ff;
        border: 1px solid #0642ff;
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
  & > div:first-child {
    display: flex;
    flex: 1;
    height: 100%;
    flex-direction: column;
    align-items: end;
    flex-wrap: nowrap;
    gap: 0.3em;
    padding: 0.7em;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 9;
  }
`;

export const BookMark = styled.div`
  & > svg {
    width: 1.5em;
    & path {
      fill: white;
    }
  }
`;

export const FeedTitle = styled.div`
  & > p:first-child {
    white-space: nowrap;
    color: white;
    font-size: 1.5rem;
  }
  & > p:nth-child(2) {
    white-space: nowrap;
    color: white;
    font-weight: bold;
    margin-top: auto;
  }
  & > p:nth-child(3) {
    white-space: nowrap;
    color: white;
    font-size: 0.8rem;
    font-weight: 100;
  }
`;

export const FeedContentView = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: -webkit-fill-available;
  height: auto;
  padding: 0.8em;
  gap: 0.5em;
  & > div:first-child {
    flex: 1;
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
  }
  & > div:nth-child(2) {
    flex: 2;
  }
  & > div:nth-child(3) {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    gap: 1em;
  }
  @media only screen and (max-width: 700px) {
    & > div:first-child {
      flex-direction: row;
    }
    & > div:nth-child(3) {
      justify-content: center;
    }
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
export const InfoTable = styled.table`
  width: 100%;
  & td {
    padding: 0.3em;
    white-space: nowrap;
  }
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

export const InfoTabelForMobile = styled.div`
  display: none;
  @media only screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0;
    gap: 0.5rem;
    & > div {
      display: flex;
      gap: 0.5rem;
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
  @media only screen and (max-width: 700px) {
    padding: 1rem;
    font-size: 1.1rem;
  }
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
  &:disabled {
    color: #7c7c7c;
    cursor: default;
    border: 1px solid #7c7c7c;
    &:hover {
      border: 1px solid #7c7c7c;
      background: white;
    }
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
  &:disabled {
    background: #c4c4c4;
    cursor: default;
    &:hover {
      color: white;
      border: 1px solid white;
    }
  }
`;

/* business Profile */

export const BusinessListBox = styled.div`
  margin: 6rem auto;
  display: flex;
  gap: 1rem;
  text-align: center;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;

  & > div:nth-child(2) {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
  }

  @media only screen and (max-width: 700px) {
    margin: 2rem auto;
    & > div:nth-child(2) {
      flex-direction: column;
      gap: 0;
    }
  }
`;

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
export const BusinessHeader = styled.div`
  transform: translate(2rem, 0);
  display: flex;
  justify-content: center;
  width: 100%;
  & > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    & > p:nth-child(1) {
      font-size: 1rem;
      font-weight: 600;
    }
    & > p:nth-child(2) {
      font-size: 0.8rem;
      color: #7c7c7c;
      line-height: 1.3rem;
    }
  }
  @media only screen and (max-width: 700px) {
    transform: translate(0.5rem, 0);
    flex-direction: column;
    gap: 1rem;
    & > div:first-child {
      width: 90%;
      line-height: 1.5rem;
      text-align: left;
      gap: 0.5rem;
      & > p:nth-child(1) {
        font-size: 1rem;
        font-weight: 600;
      }
      & > p:nth-child(2) {
        font-size: 0.8rem;
        color: #7c7c7c;
        line-height: 1.3rem;
      }
    }
  }
`;
export const BusinessEditBtn = styled.div`
  width: 3rem;
  & > svg {
    width: 1rem;
    cursor: pointer;
    :hover {
      path {
        fill: #0642ff;
      }
    }
  }
  & > button {
    font-size: 0.8rem;
    border: none;
    background-color: inherit;
    :hover {
      color: #0642ff;
    }
  }
`;

export const BusinessProfile = styled.div`
  width: 90%;
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;

export const BImgBox = styled(ImgBox)`
  width: 8rem;
  height: 8rem;
  cursor: pointer;
`;
export const DeleteBtn = styled.button`
  position: relative;
  transform: translate(360%, 100%);
  border: none;
  border-radius: 100%;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  & > svg {
    width: 0.8rem;
    height: 0.8rem;
  }
`;
export const AddBProfileBtn = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  display: flex;
  & > svg {
    margin: auto;
    width: 4rem;
  }
`;
