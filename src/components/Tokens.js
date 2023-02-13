import '../Tokens.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';

const Tokens = (props) => {
    const [tokens,setTokens] = useState([]);
    const params = useParams();
    // console.log("Params",params);
    // console.log("props",props);
    useEffect(() => {
        axios.get(`http://18.179.112.126:5000/user/${props.userID}/card/${params.id}/tokens`)
        .then((response) => {
            console.log("Response",response.data.response);
            setTokens(response.data.response);
        })
    },[]);

    return (
        <div className="tokenContainer">
            <table>
                <tr>
                    <th>
                        <h3>Tokens</h3>
                    </th>
                    <th>
                        <h3>Action</h3>
                    </th>
                    <th>
                        <h3>Status</h3>
                    </th>
                </tr>
                {tokens.map((token) => {
                    return (
                        <tr key={token.id}>
                            <td>
                                {token.token_number}
                            </td>
                            <td>
                                <Link to={`/tokens/${token.id}`}><button>Get Details</button></Link>
                            </td>
                            <td>
                                {token.status}
                            </td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default Tokens;