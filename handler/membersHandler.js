const express = require('express');
const router = express.Router();
router.get((req,res)=>{
    res.succ('aaa')
})
module.exports = router;