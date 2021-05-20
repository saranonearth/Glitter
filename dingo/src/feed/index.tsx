import React from 'react'
import ProfileChip from './components/ProfileChip';


import Tabs from './components/Tabs'
import GlitInput from "./components/GlitInput"
import GlitButton from './components/GlitButton';
import FeedCard from './components/FeedCard';
interface Props {
    
}

const index = (props: Props) => {
    return (
        <div className="w-screen bg-gray-100 h-full">
            <div className="w-5/12 m-auto">
                <div className="flex justify-center">
                    <p style={{fontSize:'4em'}}>
                        🦄
                    </p>
                </div>
                <Tabs />
                <ProfileChip />
                <GlitInput />
                <GlitButton />
                {
                    [1,2,3,4,5,6,7,8,9,10].map((e,i)=><FeedCard key={i} />)
                }
            </div>
        </div>
    )
}

export default index;
