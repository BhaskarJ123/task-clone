import CreateToken from './CreateToken';
import '../UserCard.css';

const UserCard = (props) => {
    return (
        
            <div className="userCard">
                <img src="https://cdn-icons-png.flaticon.com/512/6404/6404078.png" alt="logo" />
                <h3>XXXX-XXXX-XXXX-{props.userCardData.card_number.substring(15)}</h3>
                <CreateToken userID={props.userCardData.user_id} cardID={props.userCardData.id} toggleTokenFlag={props.toggleTokenFlag}/>
                <div className='cardTokens'>
                    <h3>{props.userCardData.name_on_card.toUpperCase()}</h3>
                    <p>VALID THRU: {props.userCardData.exp_date}</p>
                </div>
            </div>
    )
}

export default UserCard;