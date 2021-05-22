import React from 'react'

import { TABS } from './FeedHolder'

interface Props {
    handleTabChange: (tab: string)=> void;
    selectedTab: string
}

const Tabs = ({handleTabChange, selectedTab}: Props) => {
    return React.useMemo(()=>(
        <div className="bg-white">
        <div className="flex-col-h">
        <div className="tab-holder">
        <div onClick={()=> handleTabChange(TABS.FEED)}  className={selectedTab===TABS.FEED? "tab tab-selected":"tab"}>
            Feed
        </div>
        </div>
        <div className="tab-holder">
            <div onClick={()=> handleTabChange(TABS.DISCOVER)}  className={selectedTab===TABS.DISCOVER? "tab tab-selected":"tab"}>
            Discover
        </div>
        </div>
    </div>
    </div>
    ),[selectedTab])
}

export default Tabs
