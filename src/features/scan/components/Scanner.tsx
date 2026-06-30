"use client"

import { useEffect } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"

type Props = {
  onSuccess: (value: string) => void
}

export default function Scanner({ onSuccess }: Props) {
  useEffect(() => {
    const container = document.getElementById("qr-reader")

    if (container) {
      container.innerHTML = ""
    }

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: {
          width: 220,
          height: 220,
        },
      },
      false
    )

    scanner.render(
      (decodedText) => {
        onSuccess(decodedText)
      },

      () => {}
    )

    return () => {
      scanner.clear().catch(() => {})

      if (container) {
        container.innerHTML = ""
      }
    }
  }, [])

  return (
    <div
      id="qr-reader"
      className="
        overflow-hidden
        rounded-xl
      "
    />
  )
}
