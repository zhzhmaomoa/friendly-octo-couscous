import express from "express"
import { Contribution }  from "../model/contribution.js";
import { Member }  from "../model/member.js";
const router = express.Router();
import 'dotenv/config'
import path from "path"
import fs from "fs"
import multer from "multer";
const storage = multer.diskStorage({
        destination:function(req,file,cb){
                cb(null,'uploads/memberImg');
        },
        filename:function(req,file,cb){
                const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const filename = uniqueName + path.extname(file.originalname);
                cb(null,filename)
        }
})
const upload = multer({storage:storage});
router.get("/",async(req,res)=>{
	const {pageSize,pageNum} = req.query;
	try {
		const result  =await Member.findAll({
			order:[['createdAt','DESC']],
			offset:(pageNum-1)*pageSize,
			limit:Number(pageSize)
		});
		result.forEach((ele,i)=>{
          	      //result[i].iconPath= process.env.IP+":"+process.env.PORT+"/memberImg/"+ele.iconPath;
          	      result[i].iconPath= process.env.UPLOAD_ADDRESS+"/memberImg/"+ele.iconPath;
        	});
		res.succ(result);
	} catch (error) {
		res.fail(error);
	}
})
router.post("/",upload.single('iconPath'),async (req,res)=>{
    try {
        await Member.create({...req.body,iconPath:req.file.filename});
        res.succ();
    } catch (error) {
        res.fail(error);
    }

})
router.put("/",upload.single('iconPath'),async (req,res)=>{
	try {
		const {id,...extra}= req.body;
		if(req.file){
			const oldData = await Member.findOne({where:{id}});
			await Member.update({...extra,iconPath:req.file.filename},{where:{id}})
			const filePath = path.resolve(path.join("uploads/memberImg/",path.basename(oldData.iconPath)));
			fs.rm(filePath,(err)=>{
				if(err){
					throw err;
				}
				res.succ();
			})
		}else{
			await Member.update(extra,{where:{id}});
			res.succ();
		}
	}catch(error){
		res.fail(error);
	}
})
router.delete("/",async (req,res)=>{
    try {
        const {id,iconPath} = req.body
        const filepath = path.resolve(path.join("uploads/memberImg/",path.basename(iconPath)));
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
export default router;
