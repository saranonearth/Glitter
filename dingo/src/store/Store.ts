import { createContext } from 'react'
import { Document } from 'mongoose'

export interface User extends Document {
    avatar: string,
    username: string,
    email: string,
    _id: string
}

export interface Tweet extends Document {
    tweetText: string,
    postedBy: string
}

export interface Store {
    isAuth: boolean,
    user: User | null,
    feed: Array<Tweet> | [],
    isBusy: boolean
}


const Store = createContext<{
    state: Store;
    dispatch: React.Dispatch<any>;
}>({
    state: {
        isAuth: false,
        user: null,
        feed: [],
        isBusy: false
    },
    dispatch: () => null
});


export default Store;