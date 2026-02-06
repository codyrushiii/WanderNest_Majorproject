//require the mongoose,data.js,Listing(model) 
const mongoose=require("mongoose");
const initData=require("./data.js");
//const Listing=require("./models/listing.js");
const Listing=require("C:/Users/DELL/Desktop/MajorProject/models/listing.js");

//connection b/w MongoDB & Nodejs
const MONGO_URL='mongodb://127.0.0.1:27017/wandernest';

async function main() {
    await mongoose.connect(MONGO_URL);
}  

main().then(()=>{
    console.log('connected to DB')
}).catch((err)=>{
    console.log(err);
});

//Initialisation of DB
const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
         ...obj,owner:"676e68c43b4ccdac02b71f65",
    }));
    
    await Listing.insertMany(initData.data);
     console.log('Data was initialized');

};
initDB();




