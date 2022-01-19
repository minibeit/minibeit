import React, { lazy, useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Toaster } from "react-hot-toast";
import { NavBar, Footer } from "./components/Common";

const Main = lazy(() => import("./pages/Main"));
const ProcessLogin = lazy(() => import("./pages/ProcessLogin"));
const Profile = lazy(() => import("./pages/Profile"));
const BProfile = lazy(() => import("./pages/BProfile"));
const Apply = lazy(() => import("./pages/Apply"));
const ApplyDetail = lazy(() => import("./pages/ApplyDetail"));
const Recruit = lazy(() => import("./pages/Recruit"));
const RecruitComplete = lazy(() => import("./pages/RecruitComplete"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname.pathname]);
  return (
    <>
      <NavBar />
      <Toaster />
      <TransitionGroup className="transition-group">
        <CSSTransition
          key={pathname.pathname}
          timeout={300}
          classNames="pageTransition"
        >
          <Suspense fallback={<div />}>
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
          </Suspense>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </>
  );
}

export default App;
