const express = require("express");
const router = express.Router();


//Users
//Index Route
router.get('/',(req,res)=>{
    res.send('GET for users');
});

//Show Route
router.get('/:id',(req,res)=>{
    res.send('GET for show user id');
});

//POST Route
router.post('/',(req,res)=>{
    res.send('POST for users');
});

//DELETE Route
router.delete('/:id',(req,res)=>{
    res.send('DELETE for user id');
});

module.exports = router;
