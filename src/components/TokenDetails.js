/*import { useParams,Link } from "react-router-dom"; //Component not required anymore
import axios from 'axios';
import { useEffect, useState } from "react";
import '../TokenDetails.css';

const TokenDetails = () => {
    const params = useParams();
    const [selectedToken,setSelectedToken] = useState([]);
    const [tokenStatus,setTokenStatus] = useState('');
    const [domainName,setDomainName] = useState('');
    const [userCard,setUserCard] = useState({});

    console.log("CARD",userCard);

    const handleSuspendToken = () => {
        axios.put(`http://43.206.242.55:5000/suspend/token/${selectedToken.id}`)
        .then(() => {
            setTokenStatus('Suspended');
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const handleActivateToken = () => {
        axios.put(`http://43.206.242.55:5000/activate/token/${selectedToken.id}`)
        .then(() => {
            setTokenStatus('Active');
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const handleDeleteToken = () => {
        axios.put(`http://43.206.242.55:5000/delete/token/${selectedToken.id}`)
        .then(() => {
            setTokenStatus('Deleted');
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const getCardDetails = (cardID) => {
        axios.get(`http://43.206.242.55:5000/cardInfo/${cardID}`)
        .then((response) => {
            // console.log("Res",response);
            setUserCard(response.data.response);
        })
    }

    useEffect(() => {

        axios.get(`http://43.206.242.55:5000/tokenInfo/${parseInt(params.id)}`)
        .then((response) => {
            setSelectedToken(response.data.response[0]);
            getCardDetails(response.data.response[0].card_id);
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
        <div className="individualTokenContainer">
            <div className="tokenCardContainer">
                <h1>CARD DETAILS</h1>
                <div className="userCard">
                    {Object.keys(userCard).length===0 && <h4>Loading Card...</h4>}
                    {Object.keys(userCard).length>0 && <>
                        <img src="https://cdn-icons-png.flaticon.com/512/6404/6404078.png" alt="logo" />
                        <h3>XXXX-XXXX-XXXX-{userCard.card_number.substring(15)}</h3>
                        <div className='cardTokens'>
                            <h3>{userCard.name_on_card.toUpperCase()}</h3>
                            <p>VALID THRU: {userCard.exp_date}</p>
                        </div>
                    </>}
                </div>
            </div>
            <div className="tokenDetailsContainer">
                {Object.keys(selectedToken).length > 0 &&
                <>
                    <h1>TOKEN DETAILS</h1>
                    <div className="tokenDetails">
                        <h4><span className="detailsToken">TOKEN NO: </span><span className="mutedText">{selectedToken.token_number}</span></h4>
                        <h4><span className="detailsStatus">STATUS: </span><span className="mutedText">{tokenStatus}</span></h4>
                        <h4><span className="detailsDomain">DOMAIN: </span><span className="mutedText">{domainName}</span></h4>
                        <div className="tokenButtonsContainer">
                            {tokenStatus === 'Active' && <button type="button" class="btn actionButton" onClick={handleSuspendToken}>Suspend Token</button>}
                            {tokenStatus === 'Suspended' && <button type="button" class="btn actionButton" onClick={handleActivateToken}>Activate Token</button>}
                            {tokenStatus !== 'Deleted'&& <button type="button" class="btn actionButton" onClick={handleDeleteToken}>Delete Token</button>}
                            <Link to='/'><button type="button" className="btn actionButton">Back</button></Link>
                        </div>
                    </div>
                </>}
                {selectedToken.length === 0 && <h1>Loading...</h1>}
            </div>
        </div>
    )
}

export default TokenDetails;*/