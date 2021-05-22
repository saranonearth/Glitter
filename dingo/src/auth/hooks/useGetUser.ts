
//Module imports
import React from 'react';
import { toast } from 'react-toastify';

//Relative imports
import { UnicornService } from '../../services/UnicornService';
import useStore from '../../Store/Store';
import { User } from '../../types';


const useGetUser = () => {

    const [setBusy, setUser, setIsAuth, setLogout] = useStore(state => [state.setBusy, state.setUser, state.setIsAuth, state.setLogout])
    const [localUser, setLocalUser] = React.useState<User | null>(null)

    const getUser = async () => {
        try {
            setBusy(true);
            const response = await UnicornService.get('/api/auth');

            if (response.status === 200) {

                setUser(response.data);
                setLocalUser(response.data)
                setIsAuth(true);
            } else {
                setLogout();
            }
            setBusy(false);
        } catch (error) {

            setBusy(false);
            setLogout();
            localStorage.removeItem('x-glitter')
            error.response?.data?.errors?.map((e: any) => toast.error(e.msg));
        }
    }



    return [localUser, getUser] as const;
}


export default useGetUser;