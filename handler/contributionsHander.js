import express from "express";
import { Contribution,Member } from "../db.js";
const router = express.Router();
router.post("/",async (req,res)=>{
    // console.log(req.body);
    try {
        await Contribution.create(req.body);
        res.succ();
    } catch (error) {
        res.fail(error)
    }

})
router.post("/batch",async (req,res)=>{
    try {
        const {formData,time} = req.body;
        const formDataTemp = formData.map((item)=>{
            const {id:MemberId,quantity} = item;
            return {
                MemberId,
                quantity,
                time
            }
        })
        await Contribution.bulkCreate(formDataTemp);
        res.succ();
    } catch (error) {
        res.fail(error)
    }
})
router.get("/:time/hasItBeenSubmittedInBulkThisMonth",async (req,res)=>{
    try {
        const {time}  = req.params;
        // console.log(time);
        const result = await Contribution.findOne({
            where:{
                time
            }
        })
        console.log(result);
        if(result){
            res.succ('本月已上传');
        }else{
            res.succ('本月未上传');
        }
    } catch (error) {
        
    }
})
router.get("/:time",async (req,res)=>{
    try {
        const {time} = req.params;
        const result = await Contribution.findAll({
            attributes:['id','time','quantity',],
            where:{
                time
            },
            include:{
                model:Member,
                attributes:['id','name']
            }
        })
       res.succ(result)
    } catch (error) {
        res.fail(error);
    }
})
router.get("/",async (req,res)=>{
    try{
        const result = await Contribution.findAll({
            attributes:['id','time','quantity',],
            include:{
                model:Member,
                attributes:['id','name']
            },
            order:[['time','ASC']]
        })
        let categories = []
        let series = [];  
        result.forEach((item)=>{
            const time = item.time.slice(0,7);
           if(!categories.includes(time)){
            categories.push(time)
           }
           const seriesIndex = series.findIndex((seriesItem)=>{
            return seriesItem.name === item.Member.name
           })
           if(seriesIndex === -1){
            series.push({
                name:item.Member.name,
                data:[item.quantity]
            })
           }else{
            series[seriesIndex].data.push(item.quantity);
           }
        })
        res.succ({categories,series});
    }catch(error){
        res.fail(error)
    }
})
router.put("/",async (req,res)=>{
    try {
        const {id,quantity} = req.body;
        // console.log(req.body);
        await Contribution.update({quantity},{
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
        await Contribution.destroy({
            where:{
                id
            }
        })
        res.succ();
    } catch (error) {
        res.fail(err);
    }
})
export default router;