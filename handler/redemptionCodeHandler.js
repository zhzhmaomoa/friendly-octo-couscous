import express from "express";
const router = express.Router();
import multer from "multer";
const upload = multer();
router.post("/",upload.none(),(req,res)=>{
	res.succ()
})
export default router;
