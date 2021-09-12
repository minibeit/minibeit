import React, { useState } from "react";
import PropTypes, { shape } from "prop-types";
import { PVImg } from "../../Common";
import * as S from "../style";
import { handleCompressImg } from "../../../utils/imgCompress";
import Portal from "../../Common/Modal/Portal";
import ProgressBar from "../../Common/Progressbar";

PSignupInfoForm.propTypes = {
  schoollist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  signupHandler: PropTypes.func.isRequired,
};

function PSignupInfoForm({ schoollist, signupHandler }) {
  // window.addEventListener("beforeunload", function (e) {
  //   let confirmationMessage = "정말 닫으시겠습니까?";
  //   e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
  //   return confirmationMessage; // Gecko, WebKit, Chrome < 34
  // });
  const [msg, setMsg] = useState("다음");
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
    gender: "",
    phoneNum: "",
    job: "",
    year: "",
    month: "",
    day: "",
    schoolId: "",
  });
  const [index, setIndex] = useState(0);
  const [img, setImg] = useState();
  const { name, nickname, phoneNum, gender, schoolId, job, year, month, day } =
    inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const [item, setitem] = useState({ bgcolor: "#6a1b9a", completed: 25 });
  const fileChange = (e) => {
    handleCompressImg(e.target.files[0]).then((res) => setImg(res));
  };
  const imgDel = () => {
    setImg(undefined);
  };
  const singupInfoFunc = (e) => {
    console.log(index);
    if (index <= 2) {
      setIndex(index + 1);
      setitem({ bgcolor: "#6a1b9a", completed: ((index + 2) / 4) * 100 });
    }
    if (index === 2) {
      setMsg("회원가입");
    } else if (index === 3) {
      e.preventDefault();
      let new_m = month;
      let new_d = day;
      if (month < 10) {
        new_m = "0" + month;
      }
      if (day < 10) {
        new_d = "0" + day;
      }
      const birth = year + "-" + new_m + "-" + new_d;
      const inputs2 = {
        name: name,
        nickname: nickname,
        gender: gender,
        phoneNum: phoneNum,
        job: job,
        birth: birth,
        schoolId: "1",
      };
      signupHandler(inputs2, img);
    }
    console.log(index);
  };
  function range(start, end) {
    let arr = [];
    let length = end - start;
    for (var i = 0; i <= length; i++) {
      arr[i] = start;
      start++;
    }
    return arr;
  }

  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <S.SIindex>{index + 1}</S.SIindex>
            <S.SIheader>
              {index === 0
                ? "프로필 설정하기"
                : index === 1
                ? "관심학교 설정하기"
                : index === 2
                ? "현재 직업 설정하기"
                : index === 3
                ? "관심분야 설정하기"
                : null}
            </S.SIheader>
          </S.ModalHeader>
          <S.ModalPro>
            <ProgressBar bgcolor={item.bgcolor} completed={item.completed} />
          </S.ModalPro>
          <S.ModalContent>
            <S.FormsignupContainer>
              {index === 0 ? (
                <>
                  <S.SignupInput
                    value={name}
                    name="name"
                    type="text"
                    placeholder="이름"
                    onChange={onChange}
                  />
                  <br />
                  <S.SignupInput
                    value={nickname}
                    name="nickname"
                    type="text"
                    placeholder="닉네임"
                    onChange={onChange}
                  />
                  <br />
                  <S.SignupSelect
                    onChange={onChange}
                    defaultValue={"DEFAULT"}
                    name="gender"
                  >
                    <option value="DEFAULT" disabled>
                      성별
                    </option>
                    <option value="MALE" key={0}>
                      남자
                    </option>
                    <option value="FEMALE" key={1}>
                      여자
                    </option>
                  </S.SignupSelect>
                  <S.SignupSelect
                    name="year"
                    onChange={onChange}
                    defaultValue={"DEFAULT"}
                  >
                    <option value="DEFAULT" disabled>
                      년
                    </option>
                    {range(1920, 2021).map((year) => (
                      <option value={year} key={year - 1919}>
                        {year}
                      </option>
                    ))}
                  </S.SignupSelect>
                  <S.SignupSelect
                    name="month"
                    onChange={onChange}
                    defaultValue={"DEFAULT"}
                  >
                    <option value="DEFAULT" disabled>
                      월
                    </option>
                    {range(1, 12).map((month) => (
                      <option value={month} key={month - 1919}>
                        {month}
                      </option>
                    ))}
                  </S.SignupSelect>
                  <S.SignupSelect
                    name="day"
                    onChange={onChange}
                    defaultValue={"DEFAULT"}
                  >
                    <option value="DEFAULT" disabled>
                      일
                    </option>
                    {range(1, 31).map((day) => (
                      <option value={day} key={day - 1919}>
                        {day}
                      </option>
                    ))}
                  </S.SignupSelect>
                  <br />
                  <S.ImgBox>
                    {img ? (
                      <PVImg img={img} />
                    ) : (
                      <S.Img src="/기본프로필.png" />
                    )}
                  </S.ImgBox>
                  <S.ImgDel onClick={imgDel}>기본이미지로 변경</S.ImgDel>
                  <S.SignupInput name="img" type="file" onChange={fileChange} />
                  <br />
                  <S.SignupInput
                    value={phoneNum}
                    name="phoneNum"
                    type="text"
                    placeholder="전화번호"
                    onChange={onChange}
                  />
                </>
              ) : index === 1 ? (
                <S.SignupSelect
                  name="schoolId"
                  onChange={onChange}
                  defaultValue={"DEFAULT"}
                >
                  <option value="DEFAULT" disabled>
                    학교를 선택하세요
                  </option>
                  {schoollist.map(({ id, name }) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <option value={id} key={id}>
                      {name}
                    </option>
                  ))}
                </S.SignupSelect>
              ) : index === 2 ? (
                <S.SignupInput
                  value={job}
                  name="job"
                  type="text"
                  placeholder="직업"
                  onChange={onChange}
                />
              ) : index === 3 ? (
                <>
                  <div>관심분야 설정</div>
                </>
              ) : null}
              <S.SignupButton type="submit" onClick={singupInfoFunc}>
                {msg}
              </S.SignupButton>
            </S.FormsignupContainer>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
export default PSignupInfoForm;
