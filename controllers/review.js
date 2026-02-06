const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

//POST Route

const postReview = async(req,res)=>{
    let {id} = req.params;
   // console.log(id);
    let listing = await Listing.findById(id);
    let newReview = await new Review(req.body.review); //("review" is object name)
    newReview.author = res.locals.currUser._id;
  
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    //console.log(newReview);
    req.flash("success","New Review Created!");

    
    res.redirect(`/listings/${listing._id}` );
    
}

const deleteReview = async(req,res)=>{
    let {id,reviewId} = req.params;

   let del = await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
   await Review.findByIdAndDelete(reviewId);
   console.log(del);
   req.flash("success","Review Deleted!");

   res.redirect(`/listings/${id}`);
}

module.exports = {postReview,deleteReview}