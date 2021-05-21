import { TABS } from './FeedHolder'

interface Props {
    handleTabChange: (tab: string)=> void;
    selectedTab: string
}

const Tabs = ({handleTabChange, selectedTab}: Props) => {
    return (
        <div className="bg-white">
        <nav className="flex flex-col sm:flex-row">
        <button onClick={()=> handleTabChange(TABS.FEED)}  className={selectedTab===TABS.FEED? "text-gray-600 py-4 px-6 block hover:text-gray-500 focus:outline-none w-6/12 text-gray-500 border-b-2 font-medium border-gray-500":"text-gray-600 py-4 px-6 block hover:text-gray-500 focus:outline-none w-6/12"}>
            Feed
        </button><button onClick={()=> handleTabChange(TABS.DISCOVER)}  className={selectedTab===TABS.DISCOVER? "text-gray-600 py-4 px-6 block hover:text-gray-500 focus:outline-none w-6/12 text-gray-500 border-b-2 font-medium border-gray-500":"text-gray-600 py-4 px-6 block hover:text-gray-500 focus:outline-none w-6/12"}>
            Discover
        </button>
    </nav>
    </div>
    )
}

export default Tabs
