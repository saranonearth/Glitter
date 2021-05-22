import React from 'react'


interface Props {
    changeHandler: (e: any) => void;
    value: string
}
const GlitInput = ({value,changeHandler}:Props) => {
    
    return React.useMemo(()=>(
        <div className="mt-10 w-full">
            <textarea value={value} onChange={(e)=>{
            
                changeHandler(e)
            }} className="rounded-lg shadow-lg text-gray-500 text-lg" style={{width:'100%', height: '100px', resize:'none', padding:'10px', outline: 'none'}} placeholder={"Share what's in your mind!"} maxLength={140}></textarea>
        </div>
    ),[value])
}

export default GlitInput
