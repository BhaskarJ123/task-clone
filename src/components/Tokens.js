import '../Tokens.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import addTokenData from '../redux/actions/addTokenData';

const Tokens = (props) => {
    const [tokens,setTokens] = useState([]);
    const [isAPILoaded,setAPILoaded] = useState(false);
    const params = useParams();
    const userCards = useSelector((state) => {
        return state.userDataReducer.user
    });
    const dispatch = useDispatch();

    let selectedCard = userCards.find((userCard) => {
        return userCard.id === parseInt(params.id);
    })
    // console.log("Params",params);
    // console.log("props",props);
    useEffect(() => {
        axios.get(`http://43.206.242.55:5000/user/${props.userID}/card/${params.id}/tokens`)
        .then((response) => {
            // console.log("Response",response.data.response);
            setTokens(response.data.response);
            setAPILoaded(true);
            dispatch(addTokenData(response.data.response));
        })
        .catch((err) => {
            setAPILoaded(true);
        })
    },[]);
    // console.log(tokens);
    return (
        <div className='tokensPageContainer'>
            <div className='selectedCardContainer'>
                <div className="userCard userTokenCard">
                    <img src="https://cdn-icons-png.flaticon.com/512/6404/6404078.png" alt="logo" />
                    <h3>XXXX-XXXX-XXXX-{selectedCard.card_number.substring(15)}</h3>
                    <div className='cardTokens'>
                        <h3>{selectedCard.name_on_card.toUpperCase()}</h3>
                        <p>VALID THRU: {selectedCard.exp_date}</p>
                    </div>
                </div>
            </div>
            <div className="tokenContainer">
                {!isAPILoaded && <div class="lds-dual-ring"></div>}
                {isAPILoaded && tokens.length === 0 && 
                    <div className='noTokensContainer'>
                        <h2>No tokens available for this card.</h2>
                        <Link to='/'><button type="button" class="btn">Go Back</button></Link>
                    </div>}
                {isAPILoaded && tokens.length > 0 && 
                <table>
                    <thead>
                        <tr>
                            <th>
                                <h3>TOKENS</h3>
                            </th>
                            <th>
                                <h3>STATUS</h3>
                            </th>
                            <th>
                                <h3>ACTION</h3>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tokens.map((token) => {
                            return (
                                <tr key={token.id}>
                                    <td>
                                        {token.token_number}
                                    </td>
                                    <td>
                                        {token.status}
                                    </td>
                                    <td>
                                        <Link to={`/tokens/${token.id}`}><button>Get Details</button></Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>}
            </div>
        </div>
    )
}

export default Tokens;