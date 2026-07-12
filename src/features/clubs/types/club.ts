export interface Club {
  id: string
  code: string
  name: {
    th: string
    en: string
  }

  shortdescription?: string
  description?: string

  imageUrl?: string
  mapimageUrl?: string //ยังไม่ต้องใส่

  category: string

  havebooth?: boolean //ยังไม่ต้องใส่
  location?: string //ยังไม่ต้องใส่
  instagram?: string //ยังไม่ต้องใส่
  boothcount?: number //ยังไม่ต้องใส่
}
