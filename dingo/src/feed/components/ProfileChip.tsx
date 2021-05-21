import _ from 'lodash'

import { User } from '../../types'

interface Props {
    logout: ()=> void;
    user:User
}

const ProfileChip = ({logout,user}: Props) => {
    const avatar = _.get(user,'avatar',"");
    return (
        <div className="w-full">
         <div className="cursor-pointer hover:shadow-lg flex flex-col items-center justify-end bg-green-300 rounded-lg relative w-full">
         <div className="h-16 w-16 z-10 shadow-md  bg-white rounded-full relative" style={{bottom: "35px",backgroundImage: `url(${avatar})`, backgroundSize:'contain'}}></div>
        <div className="flex flex-col z-0 absolute justify-end w-full bg-white shadow-lg rounded-lg py-3" style={{top: "0px" ,height: "90px"}}>
        <div className="font-bold text-gray-600 text-sm leading-5 text-center">Hey, @{_.get(user,'username',"")}</div>
         <div onClick={logout} className="text-center text-gray-500 px-2" style={{fontSize: "11px", width:'fit-content'}}>Logout</div>
        </div>
        </div>     
        </div>
    )
}

export default ProfileChip
