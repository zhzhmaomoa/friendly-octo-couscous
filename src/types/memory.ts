import * as z from "zod"; 
export const ZMemory = z.object({ 
  id:z.string(),
  date:z.iso.date(),
  title:z.string(),
  src:z.string(),
  index:z.coerce.number().int()
});
export const ZDeleteMemory = ZMemory.pick({id:true,src:true})
export type MemoryType= z.infer<typeof ZMemory>;