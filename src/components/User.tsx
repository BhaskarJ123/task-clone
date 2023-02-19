import "../User.css";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import Tokens from "./Tokens";

const User = (props: {
  userData: { name: string; email: string; mobile: string };
}) => {
  const userCards = useSelector((state: any) => {
    return state.user.users;
  });

  const [tokenFlag, setTokenFlag] = useState(false);
  const [currentUserCard, setCurrentUserCard] = useState(userCards[0]);

  const toggleTokenFlag = () => {
    const toggledTokenFlag: boolean = tokenFlag === true ? false : true;
    setTokenFlag(toggledTokenFlag);
  };

  const handleNextClick = () => {
    const newIndex: number = userCards.indexOf(currentUserCard) + 1;
    setCurrentUserCard(userCards[newIndex]);
  };

  const handlePreviousClick = () => {
    const newIndex: number = userCards.indexOf(currentUserCard) - 1;
    setCurrentUserCard(userCards[newIndex]);
  };

  return (
    <div className="userContainer">
      <div className="userDetailsContainer">
        <div className="userLogo">
          <i className="fa-solid fa-user"></i>
        </div>
        <div className="userDetails">
          <h1>{props.userData.name.toUpperCase()}</h1>
          <h5>
            <i className="fa-solid fa-envelope"></i> {props.userData.email}
          </h5>
          <h5>
            <i className="fa-solid fa-phone"></i> {props.userData.mobile}
          </h5>
        </div>
      </div>
      <div className="cardDetails">
        <h1>CARDS</h1>
        <div className="cardViewContainer">
          <button
            type="button"
            className="btn navigateButtons"
            onClick={handlePreviousClick}
            disabled={userCards.indexOf(currentUserCard) <= 0}
          >
            &laquo;
          </button>
          <UserCard
            userCardData={currentUserCard}
            toggleTokenFlag={toggleTokenFlag}
          />
          <button
            type="button"
            className="btn navigateButtons"
            onClick={handleNextClick}
            disabled={
              userCards.indexOf(currentUserCard) >= userCards.length - 1
            }
          >
            &raquo;
          </button>
        </div>
        <Tokens
          userID={currentUserCard.user_id}
          cardID={currentUserCard.id}
          tokenFlag={tokenFlag}
        />
      </div>
    </div>
  );
};

export default User;
