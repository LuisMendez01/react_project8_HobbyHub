import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LinksSideNav = () => {
    // const [scamList, setScamList] = useState(null);
    // const API_KEY = import.meta.env.VITE_APP_API_KEY;
  
    // useEffect(() => {
    //   const getScams = async () => {
    //     var requestOptions = {
    //       method: "GET",
    //       redirect: "follow",
    //     };

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
              <span className="links">Create a Crewmate!</span>
            </Link>
          </li>
          <li className="home-link" key="home-button3">
            <Link  to="/display">
              <span className="links">Display Crewmates!</span>
            </Link>
          </li>
        </ul>
        </div>
    );
  };

  export default LinksSideNav;