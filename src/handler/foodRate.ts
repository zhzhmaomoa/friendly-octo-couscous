import express,{ type Router} from "express"
import path from "path"
import multer from "multer";
import { ZDeleteFoodRate, ZFoodRate,type FoodRateType} from "../types/foodRate.js";
import { ZPageConfig } from "../types/common.js";
import { fileURLToPath } from 'url';
import crypto from 'node:crypto';
import {writeFile,readFile,rm} from "node:fs/promises"
import { FOODRATE_ADDRESS } from "../env.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router:Router = express.Router();
const directoryLocation = path.join(__dirname,"../../../vigilant-journey/assets/foodRate/data.json"),
    imgLocation = path.join(__dirname,"../../../vigilant-journey/assets/foodRate/img");
const storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,imgLocation);
	},
	filename:function(req,file,cb){
		const uniqueName = crypto.randomUUID();
		const filename = uniqueName + path.extname(file.originalname);
		cb(null,filename)
	}
})
const upload = multer({storage:storage});
async function getDirectory():Promise<Array<FoodRateType>>{
	try {
	   const str = await readFile(directoryLocation,"utf-8");
	   const directory= JSON.parse(str)
	   return directory;
	} catch (error) {
	   return Promise.reject(error) 
	}
}
async function setDirectory(newDirectory:Array<FoodRateType>){
	try {
	   await writeFile(directoryLocation,JSON.stringify(newDirectory,null,2),"utf-8") 
	} catch (error) {
	   return Promise.reject(error) 
	}
}
router.post("/",upload.single('imageSrc'),async (req,res)=>{
	 try {
		const newFoodRate:FoodRateType = ZFoodRate.parse({
			...req.body,
			imageSrc:req.file?.filename,
			id:crypto.randomUUID()
		})
		const oldDirectory = await getDirectory();
		await setDirectory([newFoodRate,...oldDirectory])
		res.json({
			isSuccess:true,
		})
	} catch (error) {
		res.json({
			isSuccess:false,
			data:error
		})
	}
})
router.put("/",upload.single('imageSrc'),async (req,res)=>{
	try {
        const file = req.file;
		const newFoodRate:FoodRateType = ZFoodRate.parse({
			...req.body,
			imageSrc:""
		})
		const oldDirectory = await getDirectory();
		const index = oldDirectory.findIndex(i=>i.id===newFoodRate.id);
		const oldData = oldDirectory[index];
		if(oldData){
			const newDirectory = [
				...oldDirectory.slice(0,index),
				{...newFoodRate,imageSrc:file?file.filename:oldData.imageSrc},
				...oldDirectory.slice(index+1,oldDirectory.length)
			]
			await Promise.all([
				file&&rm(path.join(imgLocation,path.basename(oldData.imageSrc))), 
				setDirectory(newDirectory)
			])
			res.json({
				isSuccess:true
			})
		}else{
			throw "未找到要修改的数据"
		}
	} catch (error) {
		res.json({
			isSuccess:false,
			data:error
		}) 
	}
})
router.delete("/",async (req,res)=>{
	try {
		const {id,imageSrc} = ZDeleteFoodRate.parse(req.body) 
		const oldDirectory = await getDirectory();
		const index = oldDirectory.findIndex(i=>i.id===id);
		const oldData = oldDirectory[index];
		if(oldData){
			oldDirectory.splice(index,1) 
			await Promise.all([
				rm(path.join(imgLocation,path.basename(imageSrc))), 
				setDirectory(oldDirectory)
			])
			res.json({
				isSuccess:true
			})
		}else{
			throw "未找到要删除的数据"
		}
	} catch (error) {
		res.json({
			isSuccess:false,
			data:error
		}) 
	}
})
router.get("/",async(req,res)=>{
	try {
		const {pageSize,pageNum} = ZPageConfig.parse(req.query);
		const oldDirectory = await getDirectory();
		const startIndex =(pageNum-1)*pageSize
		const newDirectory = oldDirectory.slice(startIndex,startIndex+pageSize)
			.map(i=>({
				...i,
				imageSrc:FOODRATE_ADDRESS+i.imageSrc
			}))
		res.json({
			isSuccess:true,
			data:newDirectory
		})
	} catch (error) {
		res.json({
			isSuccess:false,
			data:error
		}) 
	}
})
export default router;
