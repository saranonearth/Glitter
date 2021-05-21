import _ from 'lodash'
import { Tweet } from '../../types'
import {formatDistance} from 'date-fns'

const FeedCard = ({data}:{data: Tweet}) => {
    
    const tweetText = _.get(data,'tweetText',"");
    const author = _.get(data,"postedBy.username","");
    const authorImage = _.get(data,"postedBy.avatar","");
    const postedAt = _.get(data,"createdAt","");
    
    return (
        <div className="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
            <span className="font-light text-gray-600">
            {formatDistance(
            new Date(postedAt),
            new Date(),
            { includeSeconds: true,addSuffix: true }
            )}</span>
            <div></div>
        </div>
        <div className="mt-2">
            {tweetText.length<50?<p className="text-2xl text-gray-700 font-bold hover:text-gray-600">{tweetText}</p>:
                      <p className="mt-2 text-gray-600">{tweetText}</p> }
        </div>
        <div className="flex justify-between items-center mt-4">
           <div></div>
            <div>
                <div className="flex items-center">
                    <img className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" src={authorImage} alt="avatar" />
                    <h1 className="text-gray-700 font-bold">{author}</h1>
                </div>
            </div>
        </div>
    </div>
    )
}

export default FeedCard
