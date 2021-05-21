import create from 'zustand'


type AuthStore = {
    isAuth: boolean;
    user: object | any;
    token: string;
    isBusy: boolean;
    setUser: (user: any) => void;
    setIsAuth: (value: boolean) => void;
    setToken: (token: string) => void;
    setBusy: (value: boolean) => void;
    setLogout: () => void
};

const useStore = create<AuthStore>(set => ({
    isAuth: false,
    user: null,
    token: "",
    isBusy: false,
    setUser: (user) => set(() => ({ user })),
    setIsAuth: (value) => set(state => ({ isAuth: value })),
    setToken: (token) => set(() => ({ token })),
    removeUser: () => set(() => ({ user: null })),
    removeToken: () => set(() => ({ token: "" })),
    setBusy: (value) => set(() => ({ isBusy: value })),
    setLogout: () => set(() => ({ isAuth: false, user: null }))
}))

export default useStore;
