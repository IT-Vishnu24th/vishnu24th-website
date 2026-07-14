export type ExploreItem = {
  title: string
  description: string
  href: string
  imageUrl: string
  imageLeft?: number
  imageTop?: number
  imageRight?: number
  imageBottom?: number
  active?: boolean
}

export const exploreItems: ExploreItem[] = [
  {
    title: "แผนที่",
    description: "กางแผนที่โลกวิศวะ\nนำทางสู่ทุกจุดหมายในงาน",
    href: "/explore/map",
    imageUrl: "/explore/explore_map.png",
    imageLeft: -70,
    imageTop: -7,
  },
  {
    title: "ชมรม",
    description: "ตามหาความสนใจของคุณ\n​และลูกเรือที่มีใจตรงกัน",
    href: "/explore/club",
    imageUrl: "/explore/explore_club.png",
    imageRight: -37,
    imageTop: 2,
  },
  {
    title: "อีเวนต์",
    description: "กำหนดการแสดงบนเวที\nลานเกียร์ช่วงแนะนำชมรม",
    href: "/explore/schedule",
    imageUrl: "/explore/explore_event.png",
    imageLeft: -47,
    imageBottom: -52,
    active: true,
  },
  {
    title: "ดาวน์โหลด",
    description: "หยิบของสำคัญติดเรือไปด้วย\nเผื่อไว้ใช้ยามจำเป็น",
    href: "/explore/slide",
    imageUrl: "/explore/explore_download.png",
    imageRight: -81,
    imageBottom: -40,
  },
]
