import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import '../TokenDetails.css';

const TokenDetails = () => {
    const params = useParams();
    const tokens = useSelector((state) => {
        return state.tokenDataReducer.tokens;
    });

    let selectedToken = tokens.find((token) => {
        return token.id === parseInt(params.id);
    });

    console.log(selectedToken);
    return (
        <div className="tokenDetailsContainer">
            <h1>Token Details</h1>
            <h4>Token No: {selectedToken.token_number}</h4>
            <h4>Status: {selectedToken.status}</h4>
            <h4>Domain: {selectedToken.domain_name}</h4>
            <button type="button" class="btn btn-danger">Suspend</button>    
        </div>
    )
}

export default TokenDetails;