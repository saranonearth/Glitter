import React from 'react'


import Tabs from './Tabs'
import GlitInput from "./GlitInput"
import GlitButton from './GlitButton';
import FeedCard from './FeedCard';
import ProfileChip from './ProfileChip';
import { User } from '../../types';
import Discover from '../../discover'



interface Props {
    logout: ()=>void;
    user: User;    
}

export const TABS = {
    FEED: 'FEED',
    DISCOVER: 'DISCOVER'
}

const FeedHolder = ({logout,user}: Props) => {

    const [tab,setTab] = React.useState(TABS.FEED);

    const handleTabChange = (tab:string)=> {
        setTab(tab);
    }
    return (

        <div className="w-screen bg-gray-100 h-full">
            <div className="w-5/12 m-auto full-on-mobile">
                <div className="flex justify-center">
                    <p style={{fontSize:'4em'}} className="cursor-pointer ...">
                        🦄
                    </p>
                </div>
                <Tabs selectedTab={tab} handleTabChange={handleTabChange} />
                <ProfileChip user={user} logout={logout} />
                <GlitInput />
                <GlitButton />
               
                {tab===TABS.FEED? 
                <>
                    {[1,2,3,4,5,6,7,8,9,10].map((e,i)=><FeedCard key={i} />)}
                </>
                : <Discover />}
             
            </div>
        </div>
    )
}

export default FeedHolder
