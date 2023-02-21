import "../Header.css";
import { Link } from "react-router-dom";
import React from "react";

const Header = () => {

  const userDataString: string|null = localStorage.getItem("UserData");
  let userName :string = '';

  if(userDataString !== null){
    const userData: any[] = JSON.parse(userDataString);
    userName = userData[0].name.substring(0, 1).toUpperCase() + userData[0].name.substring(1);
  }

  const handleLogout = () => {
    localStorage.clear()
  }

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
            <span>{userName}</span>
          </a>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="/" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Header;
