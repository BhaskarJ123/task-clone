import CreateToken from './CreateToken';
import { useState,useEffect} from 'react';
import React from 'react';
import '../UserCard.css';

const UserCard = (props:any) => {
    const [isCardNoHidden,setIsCardNoHidden] = useState(true);

    const toggleCardNumber = () => {
        const isCardNoHiddenFlag:boolean = isCardNoHidden === true ? false : true;
        setIsCardNoHidden(isCardNoHiddenFlag);
    }

    useEffect(() => {
        setIsCardNoHidden(true);
    },[props]);

    return (
            <div className="userCard">
                <img src="https://cdn-icons-png.flaticon.com/512/6404/6404078.png" alt="logo" />
                {isCardNoHidden && <h3>XXXX-XXXX-XXXX-{props.userCardData.card_number.substring(15)}</h3>}
                {!isCardNoHidden && <h3>{props.userCardData.card_number}</h3>}
                <div className='cardButtons'>
                    <CreateToken userID={props.userCardData.user_id} cardID={props.userCardData.id} toggleTokenFlag={props.toggleTokenFlag}/>
                    {isCardNoHidden && <button type="button" className="btn btn-secondary" onClick={toggleCardNumber}>Show Card No</button>}
                    {!isCardNoHidden && <button type="button" className="btn btn-secondary" onClick={toggleCardNumber}>Hide Card No</button>}
                </div>
                <div className='cardTokens'>
                    <h3>{props.userCardData.name_on_card.toUpperCase()}</h3>
                    <p>VALID THRU: {props.userCardData.exp_date}</p>
                </div>
            </div>
    )   
}

export default UserCard;