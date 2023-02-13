import { useParams,Link } from "react-router-dom";
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
    console.log(selectedToken);
    return (
        <div className="tokenDetailsContainer">
            <h1>TOKEN DETAILS</h1>
            <div className="tokenDetails">
                <h4><span className="detailsToken">TOKEN NO: </span><span className="mutedText">{selectedToken.token_number}</span></h4>
                <h4><span className="detailsStatus">STATUS: </span><span className="mutedText">{selectedToken.status}</span></h4>
                <h4><span className="detailsDomain">DOMAIN: </span><span className="mutedText">{selectedToken.domain_name}</span></h4>
                <button type="button" class="btn btn-danger">Suspend Token</button>
                <Link to={`/card/${selectedToken.card_id}`}><button type="button" className="btn backButton">Back</button></Link>
            </div>
        </div>
    )
}

export default TokenDetails;