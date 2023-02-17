import '../Tokens.css';
import axios from 'axios';
import { useState,useEffect } from 'react';
import {useDispatch} from 'react-redux';
import addTokenData from '../redux/actions/addTokenData';
import {useCreateTokensMutation,useSuspendTokensMutation,useDeleteTokensMutation,useGetTokensQuery} from '../redux/services/users';

const Tokens = (props) => {

    const [tokens,setTokens] = useState([]);
    const [createTokens,createTokensResult] = useCreateTokensMutation();
    const [suspendTokens,suspendTokensResult] = useSuspendTokensMutation();
    const [deleteTokens,deleteTokensResult] = useDeleteTokensMutation();
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

    const handleActivateToken = (tokenID) => {
        createTokens(tokenID);
    }

    const handleSuspendToken = (tokenID) => {   
        suspendTokens(tokenID);
    }

    const handleDeleteToken = (tokenID) => {
        deleteTokens(tokenID);
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
        });
        // useGetTokensQuery(props.userID,props.cardID);
    },[props,createTokensResult,suspendTokensResult,deleteTokensResult]);

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
                                <th className='statusColumn'>
                                    <h3>STATUS</h3>
                                </th>
                                <th className='actionColumn'>
                                    <h3>ACTIVATE/SUSPEND</h3>
                                </th>
                                <th>
                                    <h3>DELETE</h3>
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
                                            {getDomainName(token.domain_name)}
                                        </td>
                                        <td>
                                            {token.status}
                                        </td>
                                        <td>
                                            {token.status === 'Active' && <button type="button" class="btn" onClick={() => {
                                                handleSuspendToken(token.id);
                                            }}>Suspend</button>}
                                            {token.status === 'Suspended' && <button type="button" class="btn" onClick={() => {
                                                handleActivateToken(token.id);
                                            }}>Activate</button>}
                                        </td>
                                        <td>
                                            {token.status !== 'Deleted'&& <button type="button" class="btn" onClick={() => {
                                                handleDeleteToken(token.id);
                                            }}>Delete</button>}
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