import '../Tokens.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useState,useEffect } from 'react';
import {useDispatch} from 'react-redux';
import addTokenData from '../redux/actions/addTokenData';

const Tokens = (props) => {

    const [tokens,setTokens] = useState([]);
    const [isAPILoaded,setAPILoaded] = useState(false);
    const dispatch = useDispatch();

    const getDomainName = (url) => {
        let domainName = '';

        switch(url){
            case 'https://www.flipkart.com' : 
                domainName = 'Flipkart';
                break;
            case 'https://www.croma.com' : 
                domainName = 'Chroma';
                break;
            case 'https://www.amazon.in' : 
                domainName = 'Amazon';
                break;
            case 'https://www.myntra.com' : 
                domainName = 'Myntra';
                break;
            case 'https://www.ajio.com' : 
                domainName = 'Ajio';
                break;
            default: domainName = '';
        }

        return domainName;
    }
    
    useEffect(() => {
        setAPILoaded(false);
        axios.get(`http://43.206.242.55:5000/user/${props.userID}/card/${props.cardID}/tokens`)
        .then((response) => {
            setTokens(response.data.response);
            setAPILoaded(true);
            dispatch(addTokenData(response.data.response));
        })
        .catch((err) => {
            setTokens([]);
            setAPILoaded(true);
        })
    },[props]);

    return (
        <div className='tokensPageContainer'>
            <div className="tokenContainer">
                {!isAPILoaded && 
                    <div className='fetchingTokensContainer'> 
                        <h4>Fetching Tokens</h4>
                        <div class="lds-dual-ring"></div>
                    </div>
                }
                {isAPILoaded && tokens.length === 0 && 
                    <div className='noTokensContainer'>
                        <h2>No tokens available for this card.</h2>
                    </div>}
                {isAPILoaded && tokens.length > 0 && 
                <div className='tokenTableContainer'>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <h3>TOKENS</h3>
                                </th>
                                <th>
                                    <h3>DOMAIN</h3>
                                </th>
                                <th>
                                    <h3>STATUS</h3>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tokens.map((token) => {
                                return (
                                    <tr key={token.id}>
                                        <td>
                                            <Link to={`/tokens/${token.id}`}>{token.token_number}</Link>
                                        </td>
                                        <td>
                                            {getDomainName(token.domain_name)}
                                        </td>
                                        <td>
                                            {token.status}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>}
            </div>
        </div>
    )
}

export default Tokens;