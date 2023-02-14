import '../User.css';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import CreateToken from './CreateToken';

const User = (props) => {
    const userCards = useSelector((state) => {
        return state.userDataReducer.user
    });
    // console.log("Props",props);
    // console.log("Cards",userCards);
    // console.log("CArds",userCards);
    return (
        <div className='userContainer'>
            <div className="userDetailsContainer">
                <div className="userLogo">
                    <i className="fa-solid fa-user"></i>
                </div>
                <div className="userDetails">
                    <h1>{props.userData.name.toUpperCase()}</h1>
                    <h5><i className="fa-solid fa-envelope"></i> {props.userData.email}</h5>
                    <h5><i className="fa-solid fa-phone"></i> {props.userData.mobile}</h5>
                </div>
            </div>
            <div className="cardDetails">
                <h1>CARDS</h1>
                {userCards.map((userCard) => {
                    return (
                        <div className="userCard" key={userCard.id}>
                            <img src = "https://cdn-icons-png.flaticon.com/512/6404/6404078.png" alt="logo"/>
                            <h3>XXXX-XXXX-XXXX-{userCard.card_number.substring(15)}</h3>
                            <CreateToken userID={props.userData.user_id} cardID={userCard.id}/>
                            <div className='cardTokens'>
                                <h3>{userCard.name_on_card.toUpperCase()}</h3>
                                <p>VALID THRU: {userCard.exp_date}</p>
                                <Link to={`card/${userCard.id}`}><button type="button" className="btn">Get Tokens</button></Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default User;