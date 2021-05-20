import React from 'react'



const GlitButton = () => {
    return (
        <div className="flex items-center w-full mt-1">

            <button style={{backgroundColor:"rgba(75,85,99,1)", color:"#fff", fontWeight:500}} className="bg-gray w-full  text-white font-bold rounded border-b-2 border-gray-400 shadow-md py-2 px-6 inline-flex items-center hover:bg-gray-300">
        
        <div className="flex justify-center w-full">
         <span className="mr-2">Glitttt it</span>
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="#fff" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
        </svg>
         </div>
            </button>

        </div>
    )
}

export default GlitButton
