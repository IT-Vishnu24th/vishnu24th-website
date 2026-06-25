export interface Club {
  id: string
  name: string

  shortdescription?: string
  description?: string

  imageUrl?: string
  mapimageUrl?: string

  categoryId: string

  havebooth?: boolean
  location?: string
  instagram?: string
  boothcount?: number
}
