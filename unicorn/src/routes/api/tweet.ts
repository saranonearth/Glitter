

//Modules
import { Router, Response } from "express";
import { check, validationResult } from "express-validator/check";
import mongoose from "mongoose"




//Relative imports
import { ITweet } from './../../models/Tweet';
import { IUser } from './../../models/User';
import auth from "../../middleware/auth";
import Request from "../../types/Request";
import Tweet from '../../models/Tweet';
import JSONResponse from '../../util/ResponseHandler';





const router: Router = Router();

// @route   GET api/tweet
// @desc    Get tweets of a user
// @access  Private
router.get("/", auth, async (req: Request, res: Response) => {

    try {

        let followers: Array<mongoose.Types.ObjectId> = req.body.followers;

        if (!followers) {
            return JSONResponse.badRequest(req, res, "", { errors: [{ error: "Please provide followers" }] });
        }

        //adding current user to have the user's tweets too in the feed
        followers.push(mongoose.Types.ObjectId(req.userId));



        const tweetsOfFollowers: ITweet[] = await Tweet.find({
            'postedBy': {
                $in: [...followers]
            }
        })

        console.log(tweetsOfFollowers);

        return JSONResponse.success(req, res, "", tweetsOfFollowers);


    } catch (err) {
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return JSONResponse.badRequest(req, res, "", { errors: errors.array() });
        }

        const { tweetText } = req.body;
        try {

            const tweet: ITweet = new Tweet({
                tweetText,
                postedBy: req.userId
            })

            await tweet.save();


            return JSONResponse.success(req, res, "", tweet);

        } catch (err) {
            JSONResponse.serverError(req, res, "Server Error", {})
        }
    }
);

export default router;
