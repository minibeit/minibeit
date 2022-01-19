import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Toaster } from "react-hot-toast";

import Main from "./pages/Main";
import ProcessLogin from "./pages/ProcessLogin";
import Profile from "./pages/Profile";
import BProfile from "./pages/BProfile";
import Apply from "./pages/Apply";
import ApplyDetail from "./pages/ApplyDetail";
import Recruit from "./pages/Recruit";
import RecruitComplete from "./pages/RecruitComplete";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

import { NavBar, Footer } from "./components/Common";

function App() {
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname.pathname]);
  return (
    <>
      <RecoilRoot>
        <NavBar />
        <Toaster />
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

              <Route component={NotFound} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </RecoilRoot>
    </>
  );
}

export default App;
