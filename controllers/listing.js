const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


//Index Route
const index = async(req,res)=>{
    const allListings=await Listing.find({});
    res.render('listings/index.ejs',{allListings});
}

//New Route
const renderNewForm =(req,res)=>{
    
    res.render('listings/new.ejs');
}

//Show Route
 const showListing= async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({path:"reviews",
        populate:{
        path:"author",
    },
})
    .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        res.redirect('/listings');
    }
    //console.log(listing);
    res.render('listings/show.ejs',{listing});
}

//Create Route
const createListing= async(req,res,next)=>{
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 2 //no of coordinates
      })
    .send()

   let url =req.file.path;
   let filename= req.file.filename;
 
    const newListing= await new Listing(req.body.listing); 
     console.log(req.user);
    newListing.owner = req.user._id;  
    newListing.image = {url,filename},
    newListing.geometry = (response.body.features[0].geometry);
    

     let savedListing = await newListing.save();
     
    console.log(savedListing);
    req.flash("success","New Listing Created!");
    res.redirect('/listings');
    }

//Edit Route
 const editListing= async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    let originalImageUrl = listing.image.url.replace("/upload", "/upload/h_200,w_250");
    res.render('listings/edit.ejs',{listing,originalImageUrl}); 
}

//Update Route
const updateListing= async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
   if(typeof req.file !== "undefined"){
    let url =req.file.path;
   let filename= req.file.filename;
   listing.image= {url,filename};
   await  listing.save();
   }
    req.flash("success","Listing Updated!");

    res.redirect(`/listings/${id}`);
   
}

//Delete Route
const destroyListing= async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");

    res.redirect('/listings'); 
}



module.exports= {index,renderNewForm,showListing,createListing,editListing,updateListing,destroyListing}


