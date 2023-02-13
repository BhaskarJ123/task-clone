const addTokenData = (tokenData) => {
    return{
     type: "ADD_TOKEN_DATA",
     payload: [
       ...tokenData
     ]
    }
 }
 
 export default addTokenData;