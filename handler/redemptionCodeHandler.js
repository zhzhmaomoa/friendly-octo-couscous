import express from "express";
const router = express.Router();
import {RedemptionCode} from "../model/redemptionCode.js"
import multer from "multer";
const upload = multer();
router.post("/",upload.none(),async (req,res)=>{
	try{
		await RedemptionCode.create(req.body);
		res.succ()
	}catch(e){
		res.fail(e);
	}
})
router.get("/",async (req,res)=>{
	try{
		const {pageNum,pageSize} = req.query;
		const result = await RedemptionCode.findAll({
			order:[['createdAt','DESC']],
			limit:Number(pageSize),
			offset:(pageNum-1)*pageSize
		})
		res.succ(result);
	}catch(e){
		res.fail(e);
	}
})
router.delete("/",async (req,res)=>{
	try{
		const {id} = req.body;
		await RedemptionCode.destroy({where:{id}});
		res.succ();
	}catch(e){
		res.fail(e);
	}
})
router.put("/",upload.none(),async (req,res)=>{
	try{
		const {id,...extra} = req.body;
		await RedemptionCode.update(extra,{where:{id}});
		res.succ();
	}catch(e){
		res.fail(e);
	}
})
export default router;
