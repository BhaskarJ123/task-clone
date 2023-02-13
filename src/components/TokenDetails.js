import { useParams } from "react-router-dom";

const TokenDetails = () => {
    const params = useParams();
    return (
        <h1>Individual Token {params.id}</h1>
    )
}

export default TokenDetails;