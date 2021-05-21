
//Module imports
import { toast } from 'react-toastify';
import React from 'react'



//Relative imports
import { UnicornService } from '../../services/UnicornService';
import useStore from '../../Store/Store';
import { User } from '../../types';




const useFollow = () => {

    const [user, setUser] = useStore(state => [state.user, state.setUser])
    const followUser = async (id: string) => {

        try {

            const response = await UnicornService.post(`/api/user/follow/${id}`);

            if (response.status === 200) {
                toast.dark("Followed");
                const newUser: User = { ...user, followers: [id, ...user.followers] }
                setUser(newUser);
            }

        } catch (error) {


            error.response?.data?.errors?.map((e: any) => toast.error(e.msg));
        }
    }



    return [followUser] as const;
}


export default useFollow;