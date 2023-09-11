import express from "express";
import { Contribution } from "../db.js";
const router = express.Router();
router.post("/",async (req,res)=>{
    console.log(req.body);
    await Contribution.create(req.body);
    res.succ();
})
router.get("/",async (req,res)=>{
    const {time} = req.params;
    console.log(time);
    const result = await Contribution.findAll({
        attributes:['id','nameId','time','quantity'],
    })

})
export default router;