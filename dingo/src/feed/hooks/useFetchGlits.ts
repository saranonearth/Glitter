
//Module imports
import { toast } from 'react-toastify';


//Relative imports
import { UnicornService } from '../../services/UnicornService';
import useStore from '../../Store/Store';



const useFetchGlits = () => {

    const [setGlits] = useStore(state => [state.setGlits])

    const getFeed = async () => {

        try {


            const response = await UnicornService.get('/api/tweet');

            if (response.status === 200) {
                setGlits(response.data.data);
            }

        } catch (error) {


            error.response?.data?.errors?.map((e: any) => toast.error(e.msg));
        }
    }



    return [getFeed] as const;
}


export default useFetchGlits;