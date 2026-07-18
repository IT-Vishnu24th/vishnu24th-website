import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/features/auth/providers/AuthProvider"
import { getAuthUser } from "@/lib/auth"
import { Modal } from "@/components/Modal"
import localFont from "next/font/local"
import { QueryProvider } from "@/lib/react-query"
import { toast, Toaster } from "sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const fcQuantum = localFont({
  src: "../fonts/FC Quantum [Non-commercial].otf",
  variable: "--font-fc-quantum-family",
  display: "swap",
})

const sovYeeHor = localFont({
  src: "../fonts/SOV_YeeHor.ttf",
  variable: "--font-sov-yeehor-family",
  display: "swap",
})

const ppFragmentGlare = localFont({
  src: [
    {
      path: "../fonts/PPFragment/PPFragment-GlareLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/PPFragment/PPFragment-GlareLightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/PPFragment/PPFragment-GlareRegular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/PPFragment/PPFragment-GlareRegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/PPFragment/PPFragment-GlareExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/PPFragment/PPFragment-GlareExtraBoldItalic.otf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-ppfragment-glare-family",
  display: "swap",
})

const arthemis = localFont({
  src: [
    {
      path: "../fonts/Arthemis/CSArthemis-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Arthemis/CSArthemis-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Arthemis/CSArthemis-ReverseItalic.otf",
      weight: "400",
      style: "oblique",
    },
  ],
  variable: "--font-arthemis-family",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Intania First Date 2026",
  description: "Intania First Date 2026",
  // title: "Vishnu 24th",
  // description: "ค่ายวิษณุกรรมบุตรครั้งที่ 24",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getAuthUser()

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fcQuantum.variable} ${sovYeeHor.variable} ${ppFragmentGlare.variable} ${arthemis.variable} h-full antialiased`}
    >
      <body>
        <QueryProvider>
          <AuthProvider initialUser={user}>
            <Modal />
            <Toaster
              toastOptions={{
                unstyled: true,
                classNames: {
                  toast:
                    "rounded-xl border px-4 py-3 shadow-lg flex items-center [&>div>div]:pb-1 w-full gap-3 rounded-[12px] font-fc-quantum",
                  success: "bg-status-green-dark border-status-green text-status-green",
                  error: "bg-status-red-dark border-status-red text-status-red",
                  warning: "bg-status-yellow-dark border-status-yellow text-status-yellow",
                  info: "bg-midnight border-turqoise text-turqoise",
                },
              }}
              position="top-center"
            />
            <main className="relative mx-auto min-h-screen w-full max-w-[820px] bg-background overflow-x-clip">
              {children}
            </main>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
