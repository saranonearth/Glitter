//Module imports
import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import config from "config";
import { Router, Response } from "express";
import { check, validationResult } from "express-validator/check";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";


//Relative imports
import Payload from "../../types/Payload";
import Request from "../../types/Request";
import User, { IUser } from "../../models/User";
import JSONResponse from "../..//util/ResponseHandler";
import auth from "../../middleware/auth";
import Tweet, { ITweet } from './../../models/Tweet';


const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their username,email and password, returns the token upon successful registration
// @access  Public
router.post(
  "/",
  [
    check("username", "Please include a valid username").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return JSONResponse.badRequest(req, res, "", { errors: errors.array() });
    }

    const { email, password, username } = req.body;
    try {
      let user: IUser = await User.findOne({ username });

      if (user) {
        return JSONResponse.badRequest(req, res, "", {
          errors: [
            {
              msg: "User already exists"
            }
          ]
        })
      }

      const options: gravatar.Options = {
        s: "200",
        r: "pg",
        d: "mm"
      };

      const avatar = gravatar.url(email, options);

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      // Build user object based on IUser
      const userFields = {
        email,
        username,
        password: hashed,
        avatar
      };

      user = new User(userFields);

      await user.save();

      const payload: Payload = {
        userId: user.id
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: config.get("jwtExpiration") },
        (err, token) => {
          if (err) throw err;
          JSONResponse.success(req, res, "", { token });
        }
      );
    } catch (err) {
      console.log(err)
      JSONResponse.serverError(req, res, "Server Error", {})
    }
  }
);

// @route   GET api/user
// @desc    Get users from usernames
// @access  Public
router.get("/", async (req: Request, res: Response) => {
  try {

    const escpQuery = Object.assign({}, ...Object.keys(req.query).map(obKey => {
      return { [obKey]: req.query[obKey] }
    }))

    const filter = escpQuery.filter || ''
    const filterOn = escpQuery.filterOn || ''

    let filterQuery = {}
    if (filter.length > 0) {
      if (filterOn.length > 0) {
        filterQuery = {
          [filterOn]: filter
        }
      } else {
        filterQuery = {
          username: filter
        }
      }
    }

    const users: IUser[] = await User.find(filterQuery).limit(10);

    return JSONResponse.success(req, res, "", users);


  } catch (err) {
    console.log(err);
    JSONResponse.serverError(req, res, "Server Error", {})
  }
})

// @route   POST api/user/follow?:id
// @param   id: id of the user to be followed
// @desc    Register user given their username,email and password, returns the token upon successful registration
// @access  private
router.post('/follow/:id', auth, async (req: Request, res: Response) => {
  const toFollow = req.params.id;

  try {

    const user: IUser = await User.findOne({ _id: req.userId });

    if (!user) {
      return JSONResponse.badRequest(req, res, "", { errors: [{ error: "User doesn't exist" }] });
    }

    let userFollowers = user.followers;
    userFollowers = [mongoose.Types.ObjectId(toFollow), ...userFollowers];


    user.followers = userFollowers;

    await user.save();

    //send updated tweet feed

    const newTweets: ITweet[] = await Tweet.find({
      'postedBy': {
        $in: [...userFollowers]
      }
    })


    JSONResponse.success(req, res, "Followed", newTweets);
  } catch (err) {
    console.log(err);
    JSONResponse.serverError(req, res, "Server Error", {})
  }

})

export default router;
