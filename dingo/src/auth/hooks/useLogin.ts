
//Module imports
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'


//Relative imports
import useStore from '../../Store/Store';
import { UnicornService } from '../../services/UnicornService';
import useGetUser from './useGetUser';



type CredentialsType = {
    username: string,
    password: string
}



const useLogin = () => {

    const [setBusy, setIsAuth] = useStore(state => [state.setBusy, state.setIsAuth]);
    const [getUser] = useGetUser();
    const history = useHistory();

    const initiateLogin = async (credentials: CredentialsType) => {
        const config = {
            headers: {
                "content-type": "application/json"
            }
        }
        try {
            setBusy(true);
            const response = await UnicornService.post('/api/auth', credentials, config);

            if (response.status === 200) {
                localStorage.setItem('x-glitter', response.data.data.token);
                getUser();
                setIsAuth(true);
                history.push('/feed');
            }

            setBusy(false);


        } catch (error) {
            setBusy(false);
            error.response?.data?.errors?.map((e: any) => toast.error(e.msg));
        }
    }



    return [initiateLogin];
}


export default useLogin;