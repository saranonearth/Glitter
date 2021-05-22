

//Modules
import { Router, Response } from "express";
import { check, validationResult } from "express-validator/check";
import mongoose from "mongoose"




//Relative imports
import { ITweet } from './../../models/Tweet';
import User, { IUser } from './../../models/User';
import auth from "../../middleware/auth";
import Request from "../../types/Request";
import Tweet from '../../models/Tweet';
import JSONResponse from '../../util/ResponseHandler';





const router: Router = Router();

const WSS_TWEET = "GLITTED";

// @route   GET api/tweet
// @desc    Get tweets of a user
// @access  Private
router.get("/", auth, async (req: Request, res: Response) => {

    try {


        const user: IUser = await User.findOne({ _id: req.userId });


        if (!user) {
            return JSONResponse.badRequest(req, res, "", { errors: [{ msg: "User not found" }] });
        }

        //adding current user to have the user's tweets too in the feed
        let followers = user.followers;

        followers.push(mongoose.Types.ObjectId(req.userId));

        const tweetsOfFollowers: ITweet[] = await Tweet.find({
            'postedBy': {
                $in: [...followers]
            }
        }).sort([['createdAt', -1]]).populate("postedBy", { password: 0 }).exec();


        return JSONResponse.success(req, res, "", tweetsOfFollowers);


    } catch (err) {
        console.log(err)
        JSONResponse.serverError(req, res, "Server Error", {})
    }
});


// @route   POST api/tweet
// @desc    Post tweet of a user
// @access  Private
router.post(
    "/",
    auth,
    [
        check("tweetText", "Please include a valid tweet data").not().isEmpty()
    ],
    async (req: Request, res: Response) => {
        const io = req.app.get('socketio');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return JSONResponse.badRequest(req, res, "", { errors: errors.array() });
        }

        const { tweetText } = req.body;
        try {
            console.log(req.userId)
            let tweet: ITweet = new Tweet({
                tweetText,
                postedBy: req.userId
            });

            await tweet.save();

            tweet = await tweet.populate('postedBy').execPopulate()


            io.emit(WSS_TWEET, tweet);

            return JSONResponse.success(req, res, "", tweet);

        } catch (err) {
            console.log(err)
            JSONResponse.serverError(req, res, "Server Error", {})
        }
    }
);

export default router;
