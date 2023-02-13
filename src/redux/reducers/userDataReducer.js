const initialState = {
    user: []
};

const userDataReducer = (state=initialState,action) => {
    switch(action.type){
        case 'ADD_USER_DATA': 
            return {
                ...state,
                user: [
                    ...state.user,
                    ...action.payload
                ]
        }
        default: 
            return state;
    }
}

export default userDataReducer;