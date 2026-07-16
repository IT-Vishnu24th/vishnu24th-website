"use client"

import { useEffect, useRef } from "react"
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode"

type Props = {
  onSuccess: (value: string) => void
  onError?: (message: string) => void
}

async function safeStop(scanner: Html5Qrcode) {
  try {
    const state = scanner.getState()
    if (state === Html5QrcodeScannerState.SCANNING || state === Html5QrcodeScannerState.PAUSED) {
      await scanner.stop()
    }
  } catch (error) {
    console.warn("Scanner stop skipped:", error)
  }
}

export default function Scanner({ onSuccess }: Props) {
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const scannedRef = useRef(false)
  const startPromiseRef = useRef<Promise<void> | null>(null)

  useEffect(() => {
    let mounted = true

    async function startScanner() {
      try {
        if (scannerRef.current) return

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        })

        stream.getTracks().forEach((t) => t.stop())

        if (!mounted) return

        const scanner = new Html5Qrcode("qr-reader")
        scannerRef.current = scanner

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1,
          },
          async (decodedText) => {
            if (scannedRef.current) return
            scannedRef.current = true

            const currentScanner = scannerRef.current
            scannerRef.current = null

            if (currentScanner) {
              await safeStop(currentScanner)
              try {
                currentScanner.clear()
              } catch {
                // ignore
              }
            }

            onSuccess(decodedText)
          },
          () => {}
        )

        // ถ้า unmount ไปแล้วระหว่างรอ start() resolve ให้ stop ทันที
        if (!mounted) {
          await safeStop(scanner)
          scannerRef.current = null
        }
      } catch (error) {
        console.error("Camera error", error)
      }
    }

    // เก็บ promise ของการ start ไว้ ให้ cleanup รอได้
    startPromiseRef.current = startScanner()

    return () => {
      mounted = false

      // รอให้ startScanner() (รวมถึง scanner.start()) จบสมบูรณ์ก่อน
      // ค่อย stop + เคลียร์ DOM กัน AbortError จากการลบ <video> ระหว่าง play() ค้างอยู่
      startPromiseRef.current
        ?.then(async () => {
          const scanner = scannerRef.current
          scannerRef.current = null

          if (scanner) {
            await safeStop(scanner)
            try {
              scanner.clear()
            } catch {
              // ignore
            }
          }

          const root = document.getElementById("qr-reader")
          if (root) {
            root.innerHTML = ""
          }
        })
        .catch(() => {})
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
