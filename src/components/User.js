import '../User.css';

const User = (props) => {

    return (
        <div className='userContainer'>
            <div className="userDetailsContainer">
                <div className="userLogo">
                    <i class="fa-solid fa-user"></i>
                </div>
                <div className="userDetails">
                    <h1>{props.userData.name.firstname.toUpperCase()} {props.userData.name.lastname.toUpperCase()}</h1>
                    <h5><i class="fa-solid fa-envelope"></i> {props.userData.email}</h5>
                    <h5><i class="fa-solid fa-phone"></i> {props.userData.phone}</h5>
                </div>
            </div>
            <div className="cardDetails">
                <h1>CARD DETAILS</h1>
                <div className="userCard">
                    <h3>{props.userData.name.firstname.toUpperCase()} {props.userData.name.lastname.toUpperCase()}</h3>
                    <div className='cardTokens'>
                        <h3>1234 5678 1234 5678</h3>
                        <button type="button" className="btn">Get Tokens</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User;