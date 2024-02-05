import express from "express"
import {Memory} from "../model/memory.js";
const router = express.Router();
router.post("/",async (req,res)=>{
    // console.log(req.body);
    try {
        await Memory.create(req.body);
        res.succ();
    } catch (error) {
        res.fail(error)
    }

})
router.put("/",async (req,res)=>{
    try {
        const {id,date,title} = req.body;
        // console.log(req.body);
        await Memory.update({date,title},{
            where:{
                id
            }
        })
        res.succ();
    } catch (error) {
        res.fail(error);
    }
})
router.delete("/",async (req,res)=>{
    try {
        const {id} = req.body;
        // console.log(id);
        await Memory.destroy({
            where:{
                id
            }
        })
        res.succ();
    } catch (error) {
        res.fail(err);
    }
})

router.get("/",async (req,res)=>{
    try{
        const result = await Memory.findAll({attributes:['id','src','date','title']});
        res.succ(result);
    }catch(error){
        res.fail(error)
    }
})
router.get("/latest",async (req,res)=>{
    try{
        const result = await Memory.findAll(
            {
                attributes:['src','date','title'],
                order:[['date','DESC']],
                limit:6
            }
        );
        res.succ(result);
    }catch(error){
        res.fail(error)
    }
})
export default router;
