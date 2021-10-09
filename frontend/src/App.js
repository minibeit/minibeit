import React from "react";
import { Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { RecoilRoot } from "recoil";
import Main from "./pages/Main";
import ProcessLogin from "./pages/ProcessLogin";

import SignupInfo from "./pages/SignupInfo";
import Profile from "./pages/Profile";

import BProfile from "./pages/BProfile";

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
          <Route path="/" exact component={Main} />{" "}
          <Route
            path="/callback/:id/:nickname/:accessToken/:schoolId/:signupCheck/:a/:b/:c"
            component={ProcessLogin}
          />{" "}
          <Route path="/ProcessLogin" component={ProcessLogin} />{" "}
          <Route path="/signupInfo" component={SignupInfo} />{" "}
          <Route path="/user/:userId" exact component={Profile} />{" "}
          <Route path="/business/:businessId" exact component={BProfile} />{" "}
          <Route path="/apply/:postId" exact component={ApplyDetail} />{" "}
          <Route path="/apply" component={Apply} />{" "}
          <Route path="/recruit" exact component={Recruit} />{" "}
          <Route path="/recruit/:postId/edit" exact component={RecruitEdit} />{" "}
          <Route path="/manageApply/:postId" component={ManageApply} />{" "}
        </Switch>{" "}
      </RecoilRoot>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;
