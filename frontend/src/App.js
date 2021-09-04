import React from "react";
import { Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { RecoilRoot } from "recoil";
import Main from "./pages/Main";
import ProcessLogin from "./pages/ProcessLogin";

import SignupInfo from "./pages/SignupInfo";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import BProfile from "./pages/BProfile";
import BProfileEdit from "./pages/BProfileEdit";
import Apply from "./pages/Apply";
import ApplyDetail from "./pages/ApplyDetail";
import Recruit from "./pages/Recruit";
import RecruitEdit from "./pages/RecruitEdit";
import ManageApply from "./pages/ManageApply";

function App() {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route
            path="/callback/:id/:nickname/:accessToken/:schoolId/:signupCheck"
            component={ProcessLogin}
          />
          <Route path="/ProcessLogin" component={ProcessLogin} />
          <Route path="/signupInfo" component={SignupInfo} />
          <Route path="/user/:userId" exact component={Profile} />
          <Route path="/user/:userId/edit" exact component={ProfileEdit} />
          <Route path="/business/:businessId" exact component={BProfile} />
          <Route
            path="/business/:businessId/edit"
            exact
            component={BProfileEdit}
          />
          <Route path="/apply" component={Apply} />
          <Route path="/apply/:postId" exact component={ApplyDetail} />
          <Route path="/recruit" exact component={Recruit} />
          <Route path="/recruit/:postId/edit" exact component={RecruitEdit} />
          <Route path="/manageApply/:postId" component={ManageApply} />
        </Switch>
      </RecoilRoot>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0px;
    margin: 0px;
    /* box-sizing: border-box; */
    font-family: "애플 SD 산돌고딕 Neo", "Apple SD Gothic Neo", "Malgun Gothic", "arial sans-serif";
  }
`;
