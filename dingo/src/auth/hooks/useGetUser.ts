
//Module imports
import { toast } from 'react-toastify';

//Relative imports
import { UnicornService } from '../../services/UnicornService';
import useStore from '../../Store/Store';



const useGetUser = () => {

    const [setBusy, setUser, setIsAuth] = useStore(state => [state.setBusy, state.setUser, state.setIsAuth])


    const getUser = async () => {

        try {
            setBusy(true);
            const response = await UnicornService.get('/api/auth');

            if (response.status === 200) {
                setUser(response.data);
                setIsAuth(true);
            }
            setBusy(false);
        } catch (error) {

            setBusy(false);
            error.response?.data?.errors?.map((e: any) => toast.error(e.msg));
        }
    }



    return [getUser];
}


export default useGetUser;