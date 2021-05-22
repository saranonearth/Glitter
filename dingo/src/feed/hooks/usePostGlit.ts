
//Module import
import { toast } from 'react-toastify';

//Relative imports
import { UnicornService } from '../../services/UnicornService';
import useStore from '../../Store/Store';

type GlitType = {
    tweetText: string
}



const usePostGlit = () => {

    const [glits, setGlits] = useStore(state => [state.glits, state.setGlits]);


    const postGlit = async (data: GlitType) => {

        const config = {
            headers: {
                "content-type": "application/json"
            }
        }
        const body = {
            tweetText: data.tweetText
        }


        try {

            const response = await UnicornService.post('/api/tweet', JSON.stringify(body), config);

            if (response.status === 200) {

                let newGlits = glits;
                newGlits = (glits) ? [{ ...response.data.data }, ...glits] : null;
                setGlits(newGlits)
                toast.dark("Glit posted 🎉")

            }



        } catch (error) {
            error.response?.data?.errors?.map((e: any) => toast.error(e.msg));
        }
    }



    return [postGlit];
}


export default usePostGlit;