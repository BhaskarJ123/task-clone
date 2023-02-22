import "../User.css";
import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import Tokens from "./Tokens";

const User = () => {

  if(localStorage.getItem("UserData") === null){
    window.open('/',"_self");
  }

  const userDataString: string|null = localStorage.getItem("UserData");
  let userCards :any[] = [];

  if(userDataString !== null){
    userCards = JSON.parse(userDataString);
  }

  const [tokenFlag, setTokenFlag] = useState(false);
  const [currentUserCard, setCurrentUserCard] = useState(userCards[0]);
  
  const toggleTokenFlag = () => {
    const toggledTokenFlag: boolean = tokenFlag === true ? false : true;
    setTokenFlag(toggledTokenFlag);
  };

  const handleNextClick = () => {
    let newIndex:number = 0;
    for(let card of userCards){
      if(JSON.stringify(card) === JSON.stringify(currentUserCard)){
        newIndex = userCards.indexOf(card) + 1;
        break;
      }
    }
    setCurrentUserCard(userCards[newIndex]);
  };

  const handlePreviousClick = () => {
    let newIndex:number = 0;
    for(let card of userCards){
      if(JSON.stringify(card) === JSON.stringify(currentUserCard)){
        newIndex = userCards.indexOf(card) - 1;
        break;
      }
    }
    setCurrentUserCard(userCards[newIndex]);
  };

  return (
    <div className="userContainer">
      <div className="userDetailsContainer">
        <div className="userLogo">
          <i className="fa-solid fa-user"></i>
        </div>
        <div className="userDetails">
          <h1>{userCards[0].name.toUpperCase()}</h1>
          <h5>
            <i className="fa-solid fa-envelope"></i> {userCards[0].email}
          </h5>
          <h5>
            <i className="fa-solid fa-phone"></i> {userCards[0].mobile}
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
            disabled={JSON.stringify(currentUserCard) === JSON.stringify(userCards[0])}
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
              JSON.stringify(currentUserCard) === JSON.stringify(userCards[userCards.length-1])
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
