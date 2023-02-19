import "../Header.css";
import { Link } from "react-router-dom";
import React from "react";

const Header = (props: { userName: string }) => {
  let userFirstName: string =
    props.userName.substring(0, 1).toUpperCase() + props.userName.substring(1);
  return (
    <div>
      <ul className="nav headerContainer">
        <li className="nav-item">
          <Link to="/">
            <h1>CARD91</h1>
          </Link>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-expanded="false"
          >
            <span>{userFirstName}</span>
          </a>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="/">
                Signout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Header;