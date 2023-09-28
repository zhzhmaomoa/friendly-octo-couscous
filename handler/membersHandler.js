import express from "express"
import {Member,Contribution} from "../db.js"
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
    try {
        const {id} = req.body
        await Contribution.destroy({
            where:{
                MemberId:id
            }
        })
        await Member.destroy({
            where:{
                id
            }
        })
        res.succ();
    } catch (error) {
        res.fail(error);
    }

})
export default router;