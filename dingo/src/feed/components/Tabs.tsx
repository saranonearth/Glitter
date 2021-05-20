import React from 'react'

interface Props {
    
}

const Tabs = (props: Props) => {
    return (
        <div className="bg-white">
        <nav className="flex flex-col sm:flex-row">
        <button  className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-gray-500 border-b-2 font-medium border-gray-500 w-6/12">
            Feed
        </button><button className="text-gray-600 py-4 px-6 block hover:text-gray-500 focus:outline-none w-6/12">
            Discover
        </button>
    </nav>
    </div>
    )
}

export default Tabs
