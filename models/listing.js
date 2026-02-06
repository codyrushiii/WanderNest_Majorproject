//require mongoose package
const mongoose=require("mongoose");
//Schema
const Schema=mongoose.Schema;
const Review=require("./review.js");


//Before Creating model, we will define the schema of the model(document)
const listingSchema=new Schema({
      title:{
      type:String,
      required:true,
      },
      description:String,
      image:{
      url:String,
      filename:String,
      },     
      price:Number,
      location:String,
      country:String,
      reviews: [
            {
              type: Schema.Types.ObjectId,
              ref: "Review",
            },
      ],
      owner:{
            type: Schema.Types.ObjectId,
             ref:"User",
      },
      geometry: {
            type: {
              type: String, // Don't do `{ location: { type: String } }`
              enum: ['Point'], // 'location.type' must be 'Point'
              required: true
            },
            coordinates: {
              type: [Number],
              required: true
            }
          }
});

//Middleware for Review Deletion
listingSchema.post("findOneAndDelete",async(listing)=>{
      await Review.deleteMany({_id:{$in:listing.reviews}});
});

//Now, creating the Model named as 'Listing'(model_name & collection_name must be same in singular form) 
const Listing=mongoose.model('Listing',listingSchema);


//Exporting the module to app.js
module.exports=Listing;









