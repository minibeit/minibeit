import React from "react";
import NavBar from "../../components/Common/NavBar";
import { FLCalendar } from "../../components/Apply";
import FeedListSection from "../../components/Apply/FeedListSection";
import FeedListTopContainer from "../../components/Apply/FeedListTopContainer";

export default function Apply() {
  return (
    <>
      <NavBar />
      <FLCalendar />
      <FeedListTopContainer />
      <FeedListSection />
    </>
  );
}
