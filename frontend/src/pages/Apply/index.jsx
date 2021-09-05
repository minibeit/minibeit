import React from "react";
import NavBar from "../../components/Common/NavBar";
import FilterContainer from "../../components/Apply/FilterContainer";
import ListContainer from "../../components/Apply/ListContainer";

export default function Apply() {
  return (
    <>
      <NavBar />
      <FilterContainer />
      <ListContainer />
    </>
  );
}
