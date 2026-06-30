export interface Slide {
  id: string
  title: string
  description?: string
  file: string
}

export const SLIDES: Slide[] = [
  {
    id: "1",
    title: "กดฉันสิ",
    description:
      "67676767676767676767676767667676767676766767676767676676767676767667676767676766767676767676676767676767667676767676766767676767676",
    file: "/slide/I_love_vishnu.pdf",
  },
  {
    id: "2",
    title: "แนะนำหลักสูตร",
    description: "แนะนำหลักสูตรวิศวะ",
    file: "/slides/nofile",
  },
]
