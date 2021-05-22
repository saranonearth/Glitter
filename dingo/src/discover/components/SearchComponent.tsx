import _ from 'lodash';
import React from 'react'
import Loader from 'react-loader-spinner';
import useStore from '../../Store/Store';

import { User } from '../../types';
import useFollow from '../hooks/useFollow';
import useSearchUser from '../hooks/useUserSearch';

interface Props {
    
}

const SearchComponent = (props: Props) => {

    const [param, setParam] = React.useState<string | null>("");
    const [data,loading, searchUser, handleDataSetting] = useSearchUser();
    const [user] = useStore(state=> [state.user])
    const [follow] = useFollow();


    const updateQuery = () => {
        searchUser(param);
    }

    const delayedQuery = React.useCallback(_.debounce(updateQuery, 1000), [param]);

    const onChange = (e:any) => {
        setParam(e.target.value);
        if(e.target.value===""){
            handleDataSetting([]);
            return;
        }   
    };
    React.useEffect(() => {
   delayedQuery();

   // Cancel the debounce on useEffect cleanup.
   return delayedQuery.cancel;
    }, [param, delayedQuery]);

    const handleFollowRequest = (id: string) => {
        if(id === "") return;
        follow(id)
    }       


    /**
     * @description checks whether the user is already being followed
     * @param id Id of the user
     */
    const isBeingFollowed = (id: string)=>{

        if(user && user.followers.find((_id:string) => _id.toString() === id.toString())){
            return false;
        }
        if(user && user._id === id){
            return false;
        }
        return true;
    }


    const renderStrip = (e:User) =>   <div key={_.get(e,'_id',Math.random())} className="flex justify-start cursor-pointer text-gray-700 rounded-md px-2 py-2 my-2">
                            <span className="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                            <div className="flex-grow font-medium px-2">{_.get(e,'username',"")}</div>
                           { isBeingFollowed(_.get(e,'_id',"")) && <div className="text-sm font-normal text-gray-500 tracking-wide" onClick={()=> handleFollowRequest(_.get(e,'_id',""))}>Follow</div>}
                        </div>
    return (
        <>
        <div className="w-full">
        <div className="flex w-full pt-3">
            <div className="w-full">
                <div className="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
                    <div className="block text-gray-700 text-lg font-semibold py-2 px-2">
                        Discover
                    </div>
                    <div className="flex items-center bg-gray-200 rounded-md">
                        <div className="pl-2">
                            <svg className="fill-current text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path className="heroicon-ui"
                                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                            </svg>
                        </div>
                        <input
                            value={param? param: ""}
                            onChange={(e)=> onChange(e)}
                            className="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
                            id="search" type="text" placeholder="Search users" />
                    </div>
                    <div className="py-3 text-sm">

                        {
                            loading? <div className="flex justify-center"><Loader type={"Puff"} color={"#28292b"} width={25} /></div>: 
                            data.length>0? data.map((e)=>renderStrip(e)): <p>No results found</p>
                        }
                        
                    </div>
                    <div className="block bg-gray-200 text-sm text-right py-2 px-3 -mx-3 -mb-2 rounded-b-lg">
                     
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default SearchComponent
