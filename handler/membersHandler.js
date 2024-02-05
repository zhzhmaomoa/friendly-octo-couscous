import express from "express"
import { Contribution }  from "../model/contribution.js";
import { Member }  from "../model/member.js";
const router = express.Router();
router.get("/",async(req,res)=>{
    try {
        const result  =await Member.findAll();
        res.succ(result,'查询成功');
    } catch (error) {
        res.fail(error,'查询失败');
    }
})
router.post("/",async (req,res)=>{
    try {
        await Member.create(req.body)
        res.succ(undefined,'新增成功');
    } catch (error) {
        res.fail(error,'新增失败');
    }

})
router.put("/",async (req,res)=>{
    try {
        const {id,...extra}= req.body;
        await Member.update(extra,{
            where:{
                id
            }
        })
        res.succ(undefined,'修改成功');
    } catch (error) {
        res.fail(error,'修改失败');
    }

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
        res.succ(undefined,'删除成功');
    } catch (error) {
        res.fail(error,'删除失败');
    }

})
export default router;