"use client"

import { useEffect, useRef } from "react"
import { Html5Qrcode } from "html5-qrcode"

type Props = {
  onSuccess: (value: string) => void
}

export default function Scanner({ onSuccess }: Props) {
  const scannerRef = useRef<Html5Qrcode | null>(null)

  const scannedRef = useRef(false)

  useEffect(() => {
    let mounted = true

    async function startScanner() {
      try {
        if (scannerRef.current) return

        // ขอ permission ทันที
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        })

        stream.getTracks().forEach((t) => t.stop())

        if (!mounted) return

        const scanner = new Html5Qrcode("qr-reader")

        scannerRef.current = scanner

        await scanner.start(
          {
            facingMode: "environment",
          },

          {
            fps: 10,

            qrbox: {
              width: 250,
              height: 250,
            },

            aspectRatio: 1,
          },

          async (decodedText) => {
            if (scannedRef.current) return

            scannedRef.current = true

            try {
              await scanner.stop()

              scanner.clear()

              scannerRef.current = null

              onSuccess(decodedText)
            } catch (error) {
              console.error(error)
            }
          },

          () => {}
        )
      } catch (error) {
        console.error("Camera error", error)
      }
    }

    startScanner()

    return () => {
      mounted = false

      const scanner = scannerRef.current

      scannerRef.current = null

      if (scanner) {
        scanner
          .stop()
          .catch(() => {})
          .finally(() => {
            scanner.clear()
          })
      }

      const root = document.getElementById("qr-reader")

      if (root) {
        root.innerHTML = ""
      }
    }
  }, [onSuccess])

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        bg-white
      "
    >
      <div
        id="qr-reader"
        className="
          w-full
        "
      />
    </div>
  )
}
