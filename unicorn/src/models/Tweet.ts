import { Document, Model, model, Schema } from "mongoose";

/**
 * Interface to model the User Schema for TypeScript.
 * @param tweetText:string
 */
export interface ITweet extends Document {
    tweetText: string;
}

const tweetSchema: Schema = new Schema({
    tweetText: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Tweet: Model<ITweet> = model("Tweet", tweetSchema);

export default Tweet;
