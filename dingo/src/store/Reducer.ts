import { Store, User, Tweet } from './Store';


//Reducer types
export const SET_BUSY = "SET_BUSY";
export const SET_AUTH = "SET_AUTH";
export const SET_USER = "SET_USER";
export const SET_FEED = "SET_FEED";


//Action type
type ActionType = { type: string, payload: boolean } |
{ type: string, payload: User } |
{ type: string, payload: Tweet[] }


//Reducer
const Reducer = (state: any, action: ActionType) => {
    const { type, payload } = action;

    switch (type) {
        case SET_BUSY:
            return {
                ...state,
                isBusy: payload
            }
        case SET_AUTH:
            return {
                ...state,
                isAuth: payload
            }
        case SET_USER:
            return {
                ...state,
                user: payload
            }
        case SET_FEED:
            return {
                ...state,
                feed: payload
            }
        default:
            return state
    }

}

export default Reducer;