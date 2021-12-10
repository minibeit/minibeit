import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { RecoilRoot } from "recoil";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Main from "./pages/Main";
import ProcessLogin from "./pages/ProcessLogin";
import Profile from "./pages/Profile";
import BProfile from "./pages/BProfile";
import Apply from "./pages/Apply";
import ApplyDetail from "./pages/ApplyDetail";
import Recruit from "./pages/Recruit";
import RecruitComplete from "./pages/RecruitComplete";
import SignUp from "./pages/SignUp";

import { NavBar } from "./components/Common";
import FooterComponent from "./components/Common/Footer";

function App() {
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <NavBar />
        <TransitionGroup className="transition-group">
          <CSSTransition
            key={pathname.pathname}
            timeout={300}
            classNames="pageTransition"
          >
            <Switch location={pathname}>
              <Route path="/" exact component={Main} />
              <Route
                path="/callback/:id/:nickname/:email/:accessToken/:schoolId/:signupCheck/:imgUrl1/:imgUrl2/:imgUrl3"
                component={ProcessLogin}
              />
              <Route path="/signup" component={SignUp} />
              <Route path="/business/:businessId" exact component={BProfile} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/apply/:postId" exact component={ApplyDetail} />
              <Route path="/apply" component={Apply} />
              <Route path="/recruit" exact component={Recruit} />
              <Route
                path="/recruit/complete/:postId"
                exact
                component={RecruitComplete}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <FooterComponent />
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
