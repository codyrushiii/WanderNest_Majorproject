const express = require("express");
const router = express.Router({mergeParams:true});

const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {reviewSchema} = require('../schema.js');

const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const {isLoggedIn,isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

//function
const validateReview=(req,res,next)=>{
    let {error}= reviewSchema.validate(req.body);
        if(error){
        console.log(error);
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(404,errMsg);
       }
       else{
        next();
       }
    };


//Reviews
//POST Route
router.post('/', isLoggedIn,validateReview,wrapAsync(reviewController.postReview)
);

//Delete Review Route
router.delete('/:reviewId',isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview)
);

module.exports = router;

