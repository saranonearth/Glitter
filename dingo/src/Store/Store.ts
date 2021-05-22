import { Tweet, User } from '../types';
import create from 'zustand'


type AuthStore = {
    isAuth: boolean;
    user: User | any;
    token: string;
    isBusy: boolean;
    glits: Array<Tweet> | null,
    setUser: (user: any) => void;
    setIsAuth: (value: boolean) => void;
    setToken: (token: string) => void;
    setBusy: (value: boolean) => void;
    setLogout: () => void
    setGlits: (value: Tweet[] | null) => void;
};

const useStore = create<AuthStore>(set => ({
    isAuth: false,
    user: null,
    token: "",
    isBusy: false,
    glits: null,
    setUser: (user) => set(() => ({ user })),
    setIsAuth: (value) => set(state => ({ isAuth: value })),
    setToken: (token) => set(() => ({ token })),
    removeUser: () => set(() => ({ user: null })),
    removeToken: () => set(() => ({ token: "" })),
    setBusy: (value) => set(() => ({ isBusy: value })),
    setLogout: () => set(() => ({ isAuth: false, user: null })),
    setGlits: (glits) => set(() => ({ glits: glits }))
}))

export default useStore;
