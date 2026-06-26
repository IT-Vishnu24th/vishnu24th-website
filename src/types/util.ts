import { z, type ZodType } from "zod"

export const multiLangSchema = <T extends ZodType>(schema: T) =>
  z.object({ en: schema, th: schema })

export interface MultiLang<T = string> {
  en: T
  th: T
}
