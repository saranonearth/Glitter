
//Module imports
import { toast } from 'react-toastify';
import React from 'react'

//Relative imports
import { UnicornService } from '../../services/UnicornService';
import useStore from '../../Store/Store';



const useFetchGlits = () => {

    const [setBusy, setGlits] = useStore(state => [state.setBusy, state.setGlits])
    const [loading, setLoading] = React.useState<boolean>(false);

    const getFeed = async () => {

        try {

            setLoading(true);
            const response = await UnicornService.get('/api/tweet');

            if (response.status === 200) {
                setGlits(response.data.data);
            }
            setLoading(false);
        } catch (error) {

            setLoading(false);
            error.response?.data?.errors?.map((e: any) => toast.error(e.msg));
        }
    }



    return [loading, getFeed] as const;
}


export default useFetchGlits;