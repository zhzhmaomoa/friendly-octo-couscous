import express from "express"
import 'dotenv/config'
import path from "path"
import fs from "fs"
import multer from "multer";
import {Memory} from "../model/memory.js";
const router = express.Router();
const storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,'uploads/memory');
	},
	filename:function(req,file,cb){
		const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
		const filename = uniqueName + path.extname(file.originalname);
		cb(null,filename)
	}
})
const upload = multer({storage:storage});
router.post("/",upload.single('src'),async (req,res)=>{
    try {
        await Memory.create({...req.body,src:req.file.filename});
        res.succ();
    } catch (error) {
        res.fail(error)
    }

})
router.put("/",upload.single('src'),async (req,res)=>{
    try {
	console.log(req.body);
	console.log(req.file);
        const {id,date,title} = req.body;
	if(req.file){
		const oldData = await Memory.findOne({where:{id}});
        	await Memory.update({date,title,src:req.file.filename},{where:{id}})
 		const filePath = path.resolve(path.join("uploads/memory/",path.basename(oldData.src)));
		fs.rm(filePath,(err)=>{
			if(err){
				throw err;
			}
        		res.succ();
		})
	}else{
		await Memory.update({date,title},{where:{id}})
		res.succ();
	}
    } catch (error) {
        res.fail(error);
    }
})
router.delete("/",async (req,res)=>{
    try {
        const {id,src} = req.body;
	const filepath = path.resolve(path.join("uploads/memory/",path.basename(src)));
        await Memory.destroy({where:{id}})
	fs.rm(filepath,err=>{
		if(err){
			throw err;
		}
        	res.succ();
	});
    } catch (error) {
        res.fail(error);
    }
})

router.get("/",async (req,res)=>{
    const {pageSize,pageNum} = req.query;
    try{
        const result = await Memory.findAll(
		{
			attributes:['id','src','date','title'],
			order:[['date','DESC']],
			offset:(pageNum-1)*pageSize,
			limit:Number(pageSize)
		});
	result.forEach((ele,i)=>{
		result[i].src= process.env.IP+":"+process.env.PORT+"/memory/"+ele.src;
	});
        res.succ(result);
    }catch(error){
        res.fail(error)
    }
})
export default router;
