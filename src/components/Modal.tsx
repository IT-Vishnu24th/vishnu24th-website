"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { useModalStore } from "@/stores/modalStore"

export function Modal() {
  const { isOpen, component, close } = useModalStore()

  return (
    <Dialog.Root open={isOpen} onOpenChange={close}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content>{component}</Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
