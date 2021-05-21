import React from 'react'


import Tabs from './Tabs'
import GlitInput from "./GlitInput"
import GlitButton from './GlitButton';
import FeedCard from './FeedCard';
import ProfileChip from './ProfileChip';




interface Props {
    
}

const FeedHolder = (props: Props) => {
    return (

        <div className="w-screen bg-gray-100 h-full">
            <div className="w-5/12 m-auto full-on-mobile">
                <div className="flex justify-center">
                    <p style={{fontSize:'4em'}} className="cursor-pointer ...">
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

export default FeedHolder
