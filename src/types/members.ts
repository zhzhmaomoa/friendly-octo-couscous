import * as z from "zod";
enum Province {
    '河北'= '河北',
    '山西'= '山西',
    '辽宁'= '辽宁',
    '吉林'= '吉林',
    '黑龙江'= '黑龙江',
    '江苏'= '江苏',
    '浙江'= '浙江',
    '安徽'= '安徽',
    '福建'= '福建',
    '江西'= '江西',
    '山东'= '山东',
    '河南'= '河南',
    '湖北'= '湖北',
    '湖南'= '湖南',
    '广东'= '广东',
    '海南'= '海南',
    '四川'= '四川',
    '贵州'= '贵州',
    '云南'= '云南',
    '陕西'= '陕西',
    '甘肃'= '甘肃',
    '青海'= '青海',
    '内蒙古'= '内蒙古',
    '广西'= '广西',
    '西藏'= '西藏',
    '宁夏'= '宁夏',
    '新疆'= '新疆',
    '北京'= '北京',
    '天津'= '天津',
    '上海'= '上海',
    '重庆'= '重庆',
    '香港'= '香港',
    '澳门'= '澳门',
    '台湾'= '台湾'
}
export const ZMember = z.object({
    id: z.string(),
    name: z.string(),
    province:z.enum(Province),
    iconPath:z.string()
})
export const ZDeleteMember = ZMember.pick({id:true,iconPath:true})
export type MemberType = z.infer<typeof ZMember>