
//Module import
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'

//Relative imports
import { UnicornService } from '../../services/UnicornService';
import useStore from '../../Store/Store';

type GlitType = {
    tweetText: string
}



const usePostGlit = () => {

    const [user, glits, setGlits] = useStore(state => [state.user, state.glits, state.setGlits]);
    const history = useHistory();

    const postGlit = async (data: GlitType) => {
        console.log(data)
        const config = {
            headers: {
                "content-type": "application/json"
            }
        }
        const body = {
            tweetText: data.tweetText
        }

        console.log(body)
        try {

            const response = await UnicornService.post('/api/tweet', JSON.stringify(body), config);

            if (response.status === 200) {

                let newGlits = glits;
                newGlits = (glits) ? [{ ...response.data.data, postedBy: { username: user.username, avatar: user.avatar } }, ...glits] : null;
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