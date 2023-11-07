import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LinksSideNav = () => {

    return (
        <div>
        <ul>
          <li className="home-link" key="home-button1">
            <Link  to="/">
              <span className="links">Home!</span>
            </Link>
          </li>
          <li className="home-link" key="home-button2">
            <Link  to="/create">
              <span className="links">Create a Post!</span>
            </Link>
          </li>
          <li className="home-link" key="home-button3">
            <Link  to="/newsfeed">
              <span className="links">NewsFeed!</span>
            </Link>
          </li>
        </ul>
        </div>
    );
  };

  export default LinksSideNav;