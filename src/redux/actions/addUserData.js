const addUserData = (userData) => {
   return{
    type: "ADD_USER_DATA",
    payload: userData
   }
}

export default addUserData;