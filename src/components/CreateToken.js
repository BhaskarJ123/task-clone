import axios from 'axios';
import {useState} from 'react';
import '../CreateToken.css';


const CreateToken = (props) => {

    const [createTokenMessage,setCreateTokenMessage] = useState("");

    const handleSubmit = (siteName) => {
        // console.log(siteName);
        // console.log(props.userID);
        // console.log(props.cardID);
        let domainName = '';
        switch(siteName) {
            case 'Flipkart' :
                domainName = 'https://www.flipkart.com';
                break;
            case 'Amazon' :
                domainName = 'https://www.amazon.in';
                break;
            case 'Myntra':
                domainName = 'https://www.myntra.com';
                break;
            case 'Ajio':
                domainName = 'https://www.ajio.com';
                break;
            case 'Chroma':
                domainName = 'https://www.croma.com';
                break;
            default: domainName = '';
        }

        axios.post(`http://43.206.242.55:5000/user/${parseInt(props.userID)}/card/${parseInt(props.cardID)}/create/token`, {
                domainName: domainName
              })
              .then((response) => {
                console.log(response);
                setCreateTokenMessage("Token created successfully!");
                setTimeout(() => {
                    setCreateTokenMessage("");
                },2000);
              })
              .catch((error) => {
                console.log(error);
                setCreateTokenMessage("Token already exists!");
                setTimeout(() => {
                    setCreateTokenMessage("");
                },2000);
            });
        // console.log(domainName);
    }

    return (
        <>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Create Token
                </button>
                <ul class="dropdown-menu tokenSites" aria-labelledby="dropdownMenuButton1">
                    <li onClick={() => {
                        handleSubmit("Flipkart");
                    }}>Flipkart</li>
                    <li onClick={() => {
                        handleSubmit("Amazon");
                    }}>Amazon</li>
                    <li onClick={() => {
                        handleSubmit("Myntra");
                    }}>Myntra</li>
                    <li onClick={() => {
                        handleSubmit("Ajio");
                    }}>Ajio</li>
                    <li onClick={() => {
                        handleSubmit("Chroma");
                    }}>Chroma</li>
                </ul>
            </div>
            <small>{createTokenMessage}</small>
        </>
    )
}

export default CreateToken;