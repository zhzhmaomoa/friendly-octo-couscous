const express = require('express');
const router = express.Router();
router.get((req,res)=>{
    res.succ('aaa')
})
router.post((req,res)=>{
    const {name}  = req.body
    console.log(req.body);
    res.succ();
})
module.exports = router;