import express from "express"
import {Member,Contribution} from "../db.js"
const router = express.Router();
// router.put("/update",async (req,res)=>{
//     try {
//         const ids =  await Member.findAll({
//             attributes: ['id','name','createdAt','updatedAt']
//         })
//         const object ={
//             "广州": [
//                 113.14,
//                 23.08
//             ],
//             "潮阳": [
//                 116.36,
//                 23.16
//             ],
//             "潮州": [
//                 116.38,
//                 23.4
//             ],
//             "澄海": [
//                 116.46,
//                 23.28
//             ],
//             "从化": [
//                 113.33,
//                 23.33
//             ],
//             "东莞": [
//                 113.45,
//                 23.02
//             ],
//             "恩平": [
//                 112.19,
//                 22.12
//             ],
//             "佛山": [
//                 113.06,
//                 23.02
//             ],
//             "高明": [
//                 112.5,
//                 22.53
//             ],
//             "高要": [
//                 112.26,
//                 23.02
//             ],
//             "高州": [
//                 110.5,
//                 21.54
//             ],
//             "鹤山": [
//                 112.57,
//                 22.46
//             ],
//             "河源": [
//                 114.41,
//                 23.43
//             ],
//             "花都": [
//                 113.12,
//                 23.23
//             ],
//             "化州": [
//                 110.37,
//                 21.39
//             ],
//             "惠阳": [
//                 114.28,
//                 22.48
//             ],
//             "惠州": [
//                 114.22,
//                 23.05
//             ],
//             "江门": [
//                 113.04,
//                 22.35
//             ],
//             "揭阳": [
//                 116.21,
//                 22.32
//             ],
//             "开平": [
//                 112.4,
//                 22.22
//             ],
//             "乐昌": [
//                 113.21,
//                 25.09
//             ],
//             "雷州": [
//                 110.04,
//                 20.54
//             ],
//             "廉江": [
//                 110.17,
//                 21.37
//             ],
//             "连州": [
//                 112.23,
//                 24.48
//             ],
//             "罗定": [
//                 111.33,
//                 22.46
//             ],
//             "茂名": [
//                 110.53,
//                 21.4
//             ],
//             "梅州": [
//                 116.07,
//                 24.19
//             ],
//             "南海": [
//                 113.09,
//                 23.01
//             ],
//             "番禺": [
//                 113.22,
//                 22.57
//             ],
//             "普宁": [
//                 116.1,
//                 23.18
//             ],
//             "清远": [
//                 113.01,
//                 23.42
//             ],
//             "三水": [
//                 112.52,
//                 23.1
//             ],
//             "汕头": [
//                 116.41,
//                 23.22
//             ],
//             "汕尾": [
//                 115.21,
//                 22.47
//             ],
//             "韶关": [
//                 113.37,
//                 24.48
//             ],
//             "深圳": [
//                 114.07,
//                 22.33
//             ],
//             "顺德": [
//                 113.15,
//                 22.5
//             ],
//             "四会": [
//                 112.41,
//                 23.21
//             ],
//             "台山": [
//                 112.48,
//                 22.15
//             ],
//             "吴川": [
//                 110.47,
//                 21.26
//             ],
//             "新会": [
//                 113.01,
//                 22.32
//             ],
//             "兴宁": [
//                 115.43,
//                 24.09
//             ],
//             "阳春": [
//                 111.48,
//                 22.1
//             ],
//             "阳江": [
//                 111.58,
//                 21.5
//             ],
//             "英德": [
//                 113.22,
//                 24.1
//             ],
//             "云浮": [
//                 112.02,
//                 22.57
//             ],
//             "增城": [
//                 113.49,
//                 23.18
//             ],
//             "湛江": [
//                 110.24,
//                 21.11
//             ],
//             "肇庆": [
//                 112.27,
//                 23.03
//             ],
//             "中山": [
//                 113.22,
//                 22.31
//             ],
//             "珠海": [
//                 113.34,
//                 22.17
//             ]
//         };
//         let count = 0;
//         for (const key in object) {
//             if (Object.hasOwnProperty.call(object, key)) {
//                 const element = object[key];
//                 console.log(element[0],element[1]);
//                 if(count > 39){
//                     break;
//                 }else{
//                     await Member.update({latitude:element[1],longitude:element[0]},{
//                         where:{
//                             id:ids[count].id
//                         }
//                     })
//                 }
//                 count++;
//             }
//         }
//         res.succ('');
//     } catch (error) {
//         res.fail(error);
//     }

// })
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
router.get("/mapInfo",async (req,res)=>{
    try {
        const result = await Member.findAll({
            attributes: ['id',['name','title'],'latitude','longitude','iconPath']
        })
        res.succ(result)
    } catch (error) {
        res.fail(error)
    }
})
export default router;