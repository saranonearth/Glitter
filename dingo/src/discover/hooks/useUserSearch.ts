
//Module imports
import { toast } from 'react-toastify';
import React from 'react'



//Relative imports
import { UnicornService } from '../../services/UnicornService';
import { User } from '../../types';



const useSearchUser = () => {


    const [loading, setLoading] = React.useState<boolean>(false);
    const [data, setData] = React.useState<User[]>([]);

    const handleDataSetting = (e: any) => {
        setData(e);
    }
    const searchUser = async (username: string | null) => {
        if (username === null) return;
        try {
            setLoading(true);
            const response = await UnicornService.get(`/api/user?filterOn=username&filter=${username}`);

            if (response.status === 200) {
                setData(response.data.data);
            }
            setLoading(false);
        } catch (error) {

            setLoading(false);
            error.response?.data?.errors?.map((e: any) => toast.error(e.msg));
        }
    }



    return [data, loading, searchUser, handleDataSetting] as const;
}


export default useSearchUser;