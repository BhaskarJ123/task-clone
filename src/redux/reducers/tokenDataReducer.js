const initialState = {
    tokens: []
};

const tokenDataReducer = (state=initialState,action) => {
    switch(action.type){
        case 'ADD_TOKEN_DATA': 
            return {
                ...state,
                tokens: [
                    ...state.tokens,
                    ...action.payload
                ]
        }
        default: 
            return state;
    }
}

export default tokenDataReducer;