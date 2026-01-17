import * as z from "zod"
export const ZPageConfig = z.object({
    pageSize:z.coerce.number().int(),
    pageNum:z.coerce.number().int()
})
export type PageConfigType = z.infer<typeof ZPageConfig>