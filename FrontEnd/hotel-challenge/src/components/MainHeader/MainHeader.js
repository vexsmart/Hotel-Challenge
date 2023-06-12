import React from "react";
import { Link } from "react-router-dom";
import classes from "./MainHeader.module.css";
import { NavLink } from "react-router-dom";

const MainHeader = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink to=".." className={classes.logo}>
          <h1>Hotel-Challenge</h1>
        </NavLink>
      </div>
      <section>
        <div>
          <p>
            <Link className={classes.button} to="/api">
              API-Control
            </Link>
          </p>
        </div>
      </section>
    </header>
  );
};

export default MainHeader;
