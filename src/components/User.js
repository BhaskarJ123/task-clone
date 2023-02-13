import '../User.css';
import {Link} from 'react-router-dom';

const User = (props) => {
    console.log("User",props);
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
                <h1>CARD DETAILS</h1>
                <div className="userCard">
                    <h3>XXXX-XXXX-XXXX-{props.userData.card_number.substring(15)}</h3>
                    <div className='cardTokens'>
                        <h3>{props.userData.name_on_card}</h3>
                        <Link to='/tokens'><button type="button" className="btn">Get Tokens</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User;