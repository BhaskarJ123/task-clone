import { useParams,Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import '../TokenDetails.css';

const TokenDetails = () => {
    const params = useParams();
    const [selectedToken,setSelectedToken] = useState([]);
    const [tokenStatus,setTokenStatus] = useState('');
    const [domainName,setDomainName] = useState('');

    const handleSuspendToken = () => {
        axios.put(`http://43.206.242.55:5000/suspend/token/${selectedToken.id}`)
        .then((response) => {
            setTokenStatus('Suspended');
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const handleActivateToken = () => {
        axios.put(`http://43.206.242.55:5000/activate/token/${selectedToken.id}`)
        .then((response) => {
            setTokenStatus('Active');
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const handleDeleteToken = () => {
        axios.put(`http://43.206.242.55:5000/delete/token/${selectedToken.id}`)
        .then((response) => {
            setTokenStatus('Deleted');
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        axios.get(`http://43.206.242.55:5000/tokenInfo/${parseInt(params.id)}`)
        .then((response) => {
            setSelectedToken(response.data.response[0]);
            setTokenStatus(response.data.response[0].status);
            switch(response.data.response[0].domain_name){
                case 'https://www.flipkart.com' : 
                    setDomainName('Flipkart');
                    break;
                case 'https://www.croma.com' : 
                    setDomainName('Chroma');
                    break;
                case 'https://www.amazon.in' : 
                    setDomainName('Amazon');
                    break;
                case 'https://www.myntra.com' : 
                    setDomainName('Myntra');
                    break;
                case 'https://www.ajio.com' : 
                    setDomainName('Ajio');
                    break;
                default: setDomainName('');
            }
        })
        .catch((err) => {
            console.error(err);
        });
        
    },[]);

    return (
        <>
            <div className="tokenDetailsContainer">
                {Object.keys(selectedToken).length > 0 &&
                <>
                    <h1>TOKEN DETAILS</h1>
                    <div className="tokenDetails">
                        <h4><span className="detailsToken">TOKEN NO: </span><span className="mutedText">{selectedToken.token_number}</span></h4>
                        <h4><span className="detailsStatus">STATUS: </span><span className="mutedText">{tokenStatus}</span></h4>
                        <h4><span className="detailsDomain">DOMAIN: </span><span className="mutedText">{domainName}</span></h4>
                        {tokenStatus === 'Active' && <button type="button" class="btn btn-warning" onClick={handleSuspendToken}>Suspend Token</button>}
                        {tokenStatus === 'Suspended' && <button type="button" class="btn btn-success" onClick={handleActivateToken}>Activate Token</button>}
                        {tokenStatus !== 'Deleted'&& <button type="button" class="btn btn-danger" onClick={handleDeleteToken}>Delete Token</button>}
                        <Link to='/'><button type="button" className="btn backButton">Back</button></Link>
                    </div>
                </>}
                {selectedToken.length === 0 && <h1>Loading...</h1>}
            </div>
        </>
    )
}

export default TokenDetails;