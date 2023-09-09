import express from "express"
import {Member} from "../db.js"
const router = express.Router();
router.get("/",async(req,res)=>{
    const result  =await Member.findAll({
        attributes: ['id','name','createdAt','updatedAt']
    });
    res.succ(result);
})
router.post("/",async (req,res)=>{
    await Member.create(req.body)
    res.succ();
})
router.put("/",async (req,res)=>{
    const {id,name}= req.body;
    const result = await Member.update({name},{
        where:{
            id
        }
    })
    res.succ(result);
})
router.delete("/",async (req,res)=>{
    const result = await Member.destroy({
        where:req.body
    })
    res.succ(result);
})
export default router;