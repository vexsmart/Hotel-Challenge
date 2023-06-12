import React from "react";

import MainHeader from "../MainHeader/MainHeader";

import RoomLister from "../HttpActions/RoomLister";
import Card from "../UI/Card";

const HomePage = (props) => {
  return (
    <>
      <MainHeader />
      <Card>
        <RoomLister />
      </Card>
    </>
  );
};

export default HomePage;
