"use client"

import { modalStore } from "@/stores/modalStore"
import { LoginModal } from "./LoginModal"

export const LoginButton = () => {
  return <button onClick={() => modalStore.open(<LoginModal />)}>เข้าสู่ระบบ</button>
}
