import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { getSearchUser } from "../../../../utils";
import * as S from "./style";

export default function NicknameCombo({ handleJoin }) {
  const [user, setUser] = useState([]);
  const getUser = async (input) => {
    await getSearchUser(input)
      .then((res) => setUser(res.data.data))
      .catch((err) => console.log(err));
  };
  const [userId, setUserId] = useState();
  const [clear, setClear] = useState(false);
  const [previnput, setprevinput] = useState("");
  return (
    <S.NicknameBox>
      <Autocomplete
        disablePortal
        clearOnEscape={clear}
        id="combo-box-demo"
        options={user}
        getOptionLabel={(option) => {
          setUserId(option.id);
          return option.nickname;
        }}
        sx={{
          width: 191,
          "& > div > label": {
            fontSize: 13,
            color: "black!important",
          },
          "& > div > div": {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 0,
            padding: "0!important",
            color: "black!important",
            "& > input": {
              height: "25px!important",
              color: "black!important",
            },
            "& > div": {
              display: "none",
            },
            "& > fieldset": {
              border: "none",
              background: "lightgray",
              zIndex: -1,
            },
          },
        }}
        renderInput={(params) => {
          const input = params.inputProps.value;
          if (input !== previnput) {
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
        <p>초대</p>
      </S.BPJoinBtn>
    </S.NicknameBox>
  );
}
