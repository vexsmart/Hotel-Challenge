import { Outlet } from "react-router-dom";
import MainHeader from "../MainHeader/MainHeader";

const RootLayout = (props) => {
  return (
    <>
      <MainHeader />
      <Outlet />
      <p style={{ textAlign: "center", color: "black" }}>
        Please press the API-CONTROL button, and the get-data to start.
      </p>
    </>
  );
};

export default RootLayout;
