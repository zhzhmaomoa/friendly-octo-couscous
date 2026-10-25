import * as z from "zod"; 
/**
 * 美食
 */
export const ZFoodRate = z.object({ 
  id:z.string(),
  date:z.iso.date(),
  title:z.string(),
  desc:z.string(),
  rate:z.coerce.number(),
  imageSrc:z.string(),
  lat:z.coerce.number(),//纬度
  lng:z.coerce.number(),//经度
});
export const ZDeleteFoodRate = ZFoodRate.pick({id:true,imageSrc:true})
export type FoodRateType= z.infer<typeof ZFoodRate>;