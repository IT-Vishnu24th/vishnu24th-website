import { getAuthUser } from "@/lib/auth"
import { redirect } from "next/navigation"

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const user = await getAuthUser()
  if (!user || (user.role !== "admin" && user.role !== "staff")) {
    redirect("/")
  }
  return <>{children}</>
}

export default AdminLayout
