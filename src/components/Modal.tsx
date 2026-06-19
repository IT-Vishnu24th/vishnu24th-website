"use client"

import * as Dialog from "@radix-ui/react-dialog"
<<<<<<< HEAD
import { AnimatePresence, motion } from "motion/react"

=======
>>>>>>> d327aee (add phase endpoints)
import { useModalStore } from "@/stores/modalStore"

export function Modal() {
  const { isOpen, component, close } = useModalStore()

  return (
<<<<<<< HEAD
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && close()}>
      <AnimatePresence>
        {isOpen && component && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 pointer-events-none focus-visible:outline-none"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="pointer-events-auto">{component}</div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
=======
    <Dialog.Root open={isOpen} onOpenChange={close}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content>{component}</Dialog.Content>
      </Dialog.Portal>
>>>>>>> d327aee (add phase endpoints)
    </Dialog.Root>
  )
}
