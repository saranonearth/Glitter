import React from 'react'

interface Props {
    
}

const ProfileChip = (props: Props) => {
    return (
        <div className="w-full">
         <div className="cursor-pointer hover:shadow-lg flex flex-col items-center justify-end bg-green-300 rounded-lg relative w-full">
         <div className="h-16 w-16 z-10 shadow-md  bg-white rounded-full relative" style={{bottom: "35px"}}></div>
        <div className="flex flex-col z-0 absolute justify-end w-full bg-white shadow-lg rounded-lg py-3" style={{top: "0px" ,height: "90px"}}>
        <div className="font-bold text-gray-600 text-sm leading-5 text-center">Hey, @username</div>
         <div className="text-center text-gray-500 px-2" style={{fontSize: "11px"}}>Logout</div>
        </div>
        </div>     
        </div>
    )
}

export default ProfileChip
