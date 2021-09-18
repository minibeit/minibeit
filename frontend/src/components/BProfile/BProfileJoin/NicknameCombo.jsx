import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { getSearchUser } from "../../../utils";
import * as S from "../style";

export default function NicknameCombo({ handleJoin }) {
  const [user, setUser] = useState([]);
  const getUser = async (input) => {
    console.log(input, "input");
    await getSearchUser(input)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  };
  const [userId, setUserId] = useState();
  const [clear, setClear] = useState(false);
  const [previnput, setprevinput] = useState("");
  return (
    <>
      <Autocomplete
        disablePortal
        clearOnEscape={clear}
        id="combo-box-demo"
        options={user}
        getOptionLabel={(option) => {
          setUserId(option.id);
          return option.nickname;
        }}
        sx={{ width: 300 }}
        renderInput={(params) => {
          const input = params.inputProps.value;
          if (input != previnput) {
            console.log(input, previnput);
            getUser(input);
            setprevinput(input);
          }
          return <TextField {...params} label="닉네임" />;
        }}
      />
      <S.BPJoinBtn
        onClick={async (e) => {
          e.preventDefault();
          await handleJoin(userId);
          setClear(true);
          setClear(false);
        }}
      >
        초대하기
      </S.BPJoinBtn>
    </>
  );
}
