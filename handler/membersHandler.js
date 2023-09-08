import express from "express"
import {Member} from "../db.js"
const router = express.Router();
router.get("/",async(req,res)=>{
    const result  =await Member.findAll({
        attributes: ['name','createdAt','updatedAt']
    });
    res.succ(result);
})
router.post("/",async (req,res)=>{
    const result = await Member.create(req.body)
    res.succ(result);
})
export default router;