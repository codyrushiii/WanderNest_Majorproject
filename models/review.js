//require mongoose package
const mongoose=require("mongoose");

//Schema
const Schema=mongoose.Schema;

//Define the Schema of the model
const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
});

//Creating the model
const Review = mongoose.model("Review",reviewSchema);

module.exports = Review;

