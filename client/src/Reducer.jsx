export const Reducer = (initialState, action) => {
    switch(action.type){
        case "cart":
            return [...initialState, action.payload]
        case "clear":
            return []
        case "remove":
            const newState = initialState.filter(item => item._id !== action.payload);
            return newState;
        case "qty":
            const filterState = initialState.filter(item => item._id === action.payload.id);
            filterState[0].qty = action.payload.qty
            return initialState;
        default :
            return initialState;
    }
}