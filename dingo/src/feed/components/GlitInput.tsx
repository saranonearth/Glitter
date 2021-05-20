import React from 'react'

const GlitInput = () => {
    return (
        <div className="mt-10 w-full">
            <textarea className="rounded-lg shadow-lg text-gray-500 text-lg" style={{width:'100%', height: '100px', resize:'none', padding:'10px', outline: 'none'}} placeholder={"Share what's in your mind!"} maxLength={140}></textarea>
        </div>
    )
}

export default GlitInput
