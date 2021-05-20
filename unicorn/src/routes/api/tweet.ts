
//Modules
import { Router, Response } from "express";
import { check, validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";




//Relative imports
import { ITweet } from './../../models/Tweet';
import auth from "../../middleware/auth";
import Request from "../../types/Request";
import Tweet from '../../models/Tweet';
import JSONResponse from '../..//util/ResponseHandler';



const router: Router = Router();

// @route   GET api/tweet/:id
// @desc    Get tweets of a user
// @access  Private
router.get("/", auth, async (req: Request, res: Response) => {
    try {

    } catch (err) {
        JSONResponse.serverError(req, res, "Server Error", {})
    }
});


// @route   POST api/auth
// @desc    Login user and get token
// @access  Public
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


            return res.status(HttpStatusCodes.OK).json(tweet);

        } catch (err) {
            JSONResponse.serverError(req, res, "Server Error", {})
        }
    }
);

export default router;
