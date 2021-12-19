import styled, { css } from "styled-components";

/* Common */

export const ProfilePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  width: 100vw;
  padding: 3rem 0;
  background: #f3f3f3;
  & > div:first-child {
    width: 80%;
    height: 80%;
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
`;

/* user */

export const UserInfoContainer = styled.div`
  flex: 1;
  margin-left: 1.5rem;
  min-width: 18rem;
  /* border: 1px solid #7c7c7c; */
  margin-top: 2rem;
  & > div:first-child {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    & button {
      width: 100%;
      padding: 0.8rem;
      border: none;
      border-radius: 0.8rem;
      background: #c4c4c4;
      color: white;
      cursor: pointer;
    }
  }
`;
export const UserInfoData = styled.div`
  display: flex;
  width: -webkit-fill-available;
  background: #f1f1f1;
  flex-direction: column;
  gap: 0.7rem;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-top: 1rem;
  & > div {
    font-size: 0.8rem;
    display: flex;
    align-items: flex-start;

    & > span:first-child {
      flex: 2.5;
      white-space: nowrap;
      ::before {
        content: "•";
        margin-right: 0.2rem;
      }
    }
    & > span:nth-child(2) {
      flex: 4;
      max-height: 2.5rem;
      ::before {
        content: ":";
        margin: 0 0.2rem;
      }
    }
  }
`;
export const FeedContainer = styled.div`
  flex: 3.5;
  padding: 1rem 1rem 1rem 0;
`;
export const CategoryBtnBox = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  & button {
    cursor: pointer;
    background: white;
    border: none;
    font-size: 1rem;
    font-weight: bold;
    color: #cccccc;
  }
  & button:disabled {
    color: black;
    text-decoration: underline;
    text-decoration-color: #0642ff;
  }
`;

export const NoneDiv = styled.div`
  width: 100%;
  height: 20rem;
  margin-top: 1rem;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  & > button {
    max-width: 11rem;
    line-height: 1.2rem;
    padding: 0.3rem 0.5rem;
    border-radius: 1.2rem;
    border: none;
    background: #0642ff;
    color: #fff;
    cursor: pointer;
  }
  & > p {
    color: #acacac;
    line-height: 1.2rem;
  }
`;
export const FeedGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
`;

export const FeedLabel = styled.div`
  position: absolute;
  width: 3.7rem;
  z-index: 19;
  padding: 0.3rem;
  text-align: center;
  border-radius: 2rem;
  transform: translate(15%, -50%);
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

export const FeedBox = styled.div`
  display: flex;
  max-width: 100%;
  cursor: pointer;
  border: 1px solid #c4c4c480;
  box-sizing: content-box;
  border-radius: 1em;
  overflow: hidden;
  box-shadow: 2px 2px 12px 0px #00000033;
  background: ${({ postStatus, status }) => {
    if (status === "like" && postStatus === "COMPLETE") return "#b4b4b4";
    else return "#fff";
  }};
`;

export const FeedImgView = styled.div`
  width: 100%;
  position: relative;
  flex: 1;
  & > img {
    width: inherit;
    position: absolute;
    object-fit: cover;
    height: calc(10rem);
  }
`;

export const FeedTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  padding: 1.2em;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9;
  position: absolute;
  & > p:first-child {
    color: white;
    font-size: 1.5rem;
  }
  & > p:nth-child(2) {
    color: white;
    font-weight: bold;
    margin-top: auto;
  }
  & > p:nth-child(3) {
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
  height: -webkit-fill-available;
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
    flex: 1.5;
    display: flex;
    justify-content: flex-end;
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
  }
`;
export const FeedButton = styled.button`
  border-radius: 2rem;
    font-size: 1.3rem;
    width: 47%;
    cursor: pointer;
    padding: 0.2em 0;
    white-space:nowrap;
    gap: 1rem;
}
`;
export const WhiteButton = styled(FeedButton)`
  background: #ffffff;
  border: 1px solid #0642ff;
  color: #0642ff;
`;

export const BlueButton = styled(FeedButton)`
  background: #0642ff;
  border: 1px solid white;
  color: white;
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

  & > div:nth-child(2) {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
  }
`;
export const BusinessHeader = styled.div`
  transform: translate(2rem, 0);
  display: flex;
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
  width: 10rem;
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
