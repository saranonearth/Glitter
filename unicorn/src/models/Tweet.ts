import mongoose, { Document, Model, model, Schema } from "mongoose";

/**
 * Interface to model the User Schema for TypeScript.
 * @param tweetText:string
 */
export interface ITweet extends Document {
    tweetText: string;
    postedBy: mongoose.Types.ObjectId
}

const tweetSchema: Schema = new Schema({
    tweetText: {
        type: String,
        required: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Tweet: Model<ITweet> = model("Tweet", tweetSchema);

export default Tweet;
