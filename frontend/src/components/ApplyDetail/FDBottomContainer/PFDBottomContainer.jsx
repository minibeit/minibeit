import React from "react";
import { useHistory } from "react-router";
import { feedDeleteApi } from "../../../utils";
import * as S from "../style";

function PFDBottomContainer({ post }) {
  const history = useHistory();
  const {
    author,
    content,
    doDate,
    dueDate,
    id,
    isMine,
    contact,
    pay,
    place,
    time,
    title,
    images,
  } = post;
  console.log(images);
  const deleteFeed = async () => {
    try {
      const result = await feedDeleteApi(id);
      console.log(result);

      history.push(`/feedList`);
    } catch (e) {
      console.log(e.response.data.error.msg);
      alert(e.response.data.error.msg);
    }
  };

  return (
    <>
      {isMine ? (
        <>
          <S.FDdeletebutton onClick={deleteFeed}>삭제하기</S.FDdeletebutton>
          <S.FDeditbutton
            onClick={() => {
              history.push({
                pathname: `/feedList/${id}/feedEdit`,
              });
            }}
          >
            수정하기
          </S.FDeditbutton>
          <S.FDlistbutton
            onClick={() => {
              window.location.replace("/feedList");
            }}
          >
            목록으로
          </S.FDlistbutton>
        </>
      ) : null}

      <S.FDBottomWrapper>
        <S.FDBTitle>
          <p>{title}</p>
        </S.FDBTitle>
        <S.FDauthor>
          <p>{author}</p>
        </S.FDauthor>
        <S.FDdueDate>
          <p>{dueDate}</p>
        </S.FDdueDate>
        <S.FDdoDate>
          <p>{doDate}</p>
        </S.FDdoDate>
        <S.FDpay>
          <p>{pay}</p>
        </S.FDpay>
        <S.FDtime>
          <p>{time}</p>
        </S.FDtime>
        <S.FDplace>
          <p>{place}</p>
        </S.FDplace>
        <S.FDcontact></S.FDcontact>
        <S.FDdetailInfo>
          <p>{content}</p>
          <p>{contact}</p>
        </S.FDdetailInfo>
      </S.FDBottomWrapper>
    </>
  );
}
export default PFDBottomContainer;
