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
  mapimageUrl?: string

  category: string

  havebooth?: boolean
  location?: string
  instagram?: string
  boothcount?: number
}
