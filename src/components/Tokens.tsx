import "../Tokens.css";
import React from "react";
import { useState, useEffect } from "react";
import {
  useActivateTokensMutation,
  useSuspendTokensMutation,
  useDeleteTokensMutation,
  useGetTokensQuery
} from "../redux/services/users";

const Tokens = (props: any) => {
  
  const {
    data: cardTokens,
    isFetching,
    isError,
    isSuccess,
  } = useGetTokensQuery({userID:props.userID,cardID:props.cardID}, {
    refetchOnMountOrArgChange: true,
  });
  
  
  const [tokens, setTokens] = useState([]);
  const [activateTokens, activateTokensResult] = useActivateTokensMutation();
  const [suspendTokens, suspendTokensResult] = useSuspendTokensMutation();
  const [deleteTokens, deleteTokensResult] = useDeleteTokensMutation();
  const [isAPILoaded, setAPILoaded] = useState(false);


  useEffect(() => {
    setAPILoaded(false);
    console.log("Success",isSuccess);
    if(isFetching){
      setAPILoaded(false);
    } else if(isError){
      setAPILoaded(true);
      setTokens([]);
    } else if(isSuccess){
      setAPILoaded(true);
      setTokens(cardTokens.response);
    }
  }, [props, isFetching, activateTokensResult, suspendTokensResult, deleteTokensResult]);

  const getDomainName = (url: string) => {
    let domainName = "";

    switch (url) {
      case "https://www.flipkart.com":
        domainName = "Flipkart";
        break;
      case "https://www.croma.com":
        domainName = "Chroma";
        break;
      case "https://www.amazon.in":
        domainName = "Amazon";
        break;
      case "https://www.myntra.com":
        domainName = "Myntra";
        break;
      case "https://www.ajio.com":
        domainName = "Ajio";
        break;
      default:
        domainName = "";
    }

    return domainName;
  };

  const handleActivateToken = (tokenID: string | number) => {
    activateTokens(tokenID);
  };

  const handleSuspendToken = (tokenID: string | number) => {
    suspendTokens(tokenID);
  };

  const handleDeleteToken = (tokenID: string | number) => {
    deleteTokens(tokenID);
  };

  return (
    <div className="tokensPageContainer">
      <div className="tokenContainer">
        {!isAPILoaded && (
          <div className="fetchingTokensContainer">
            <h4>Fetching Tokens</h4>
            <div className="lds-dual-ring"></div>
          </div>
        )}
        {isAPILoaded && tokens.length === 0 && (
          <div className="noTokensContainer">
            <h2>No tokens available for this card.</h2>
          </div>
        )}
        {isAPILoaded && tokens.length > 0 && (
          <div className="tokenTableContainer">
            <table>
              <thead>
                <tr>
                  <th>
                    <h3>TOKENS</h3>
                  </th>
                  <th>
                    <h3>DOMAIN</h3>
                  </th>
                  <th className="statusColumn">
                    <h3>STATUS</h3>
                  </th>
                  <th className="actionColumn">
                    <h3>ACTIVATE/SUSPEND</h3>
                  </th>
                  <th>
                    <h3>DELETE</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token: any) => {
                  return (
                    <tr key={token.id}>
                      <td>{token.token_number}</td>
                      <td>{getDomainName(token.domain_name)}</td>
                      <td>{token.status}</td>
                      <td>
                        {token.status === "Active" && (
                          <button
                            type="button"
                            className="btn"
                            onClick={() => {
                              handleSuspendToken(token.id);
                            }}
                          >
                            Suspend
                          </button>
                        )}
                        {token.status === "Suspended" && (
                          <button
                            type="button"
                            className="btn"
                            onClick={() => {
                              handleActivateToken(token.id);
                            }}
                          >
                            Activate
                          </button>
                        )}
                      </td>
                      <td>
                        {token.status !== "Deleted" && (
                          <button
                            type="button"
                            className="btn"
                            onClick={() => {
                              handleDeleteToken(token.id);
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tokens;
