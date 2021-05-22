import React from 'react'


import Tabs from './Tabs'
import GlitInput from "./GlitInput"
import GlitButton from './GlitButton';
import FeedCard from './FeedCard';
import ProfileChip from './ProfileChip';
import { User } from '../../types';
import Discover from '../../discover'
import usePostGlit from '../hooks/usePostGlit';
import useStore from '../../Store/Store';
import _ from 'lodash';
import { toast } from 'react-toastify';




interface Props {
    logout: ()=>void;
    user: User;    
}

export const TABS = {
    FEED: 'FEED',
    DISCOVER: 'DISCOVER'
}

const FeedHolder = ({logout,user}: Props) => {


    //----------------------
    //----Data containers---
    //----------------------

    const [tab,setTab] = React.useState(TABS.FEED);
    const [glit,setGlit] = React.useState<string>("");
    const [postGlit] = usePostGlit()
    const [glits] = useStore(state=> [state.glits])
    

    //-----------------------
    //----Handlers-----------
    //-----------------------

    /**
     * @description changes the tab value
     * @param tab tab value
     */
    const handleTabChange = (tab:string)=> {
        setTab(tab);
    }

    /**
     * @description glit value handler
     * @param e input event
     */
    const glitInputOnChange = (e:any) => {
       
        setGlit(e.target.value);
    }

    const handlePostGlit = () => {
        if(glit.toString().length===0) {
            toast.dark("Come on! Don't feel shy 😏");
            return;}
        
        postGlit({tweetText: glit})
        setGlit(""); //Resetting the input component
    }

    return (

        <div className="w-screen bg-gray-100 h-full">
            <div className="w-5/12 h-full m-auto full-on-mobile">
                <div className="flex justify-center">
                    <p style={{fontSize:'4em'}} className="cursor-pointer ...">
                        🦄
                    </p>
                </div>
                <Tabs selectedTab={tab} handleTabChange={handleTabChange} />
                <ProfileChip user={user} logout={logout} />
                <GlitInput value={glit} changeHandler={glitInputOnChange}/>
                <GlitButton handlePostGlit={handlePostGlit} />
               
                {tab===TABS.FEED? <>
                    { glits&&glits.length>0 ?
                    glits?.map((data)=><FeedCard key={_.get(data,"_id",Math.random())} data={data} />):
                     <p className=" text-center mt-10 text-lg text-gray-400">No glits to show. Post one! 🍭</p>
                    }
                </>
                : <Discover />}
            </div>
        </div>
    )
}

export default FeedHolder
