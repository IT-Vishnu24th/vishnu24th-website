import { ReactNode } from "react"
import { create } from "zustand"

interface ModalStore {
  isOpen: boolean
  component: ReactNode | null

  open: (component: ReactNode) => void
  close: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  component: null,

  open: (component) =>
    set({
      isOpen: true,
      component,
    }),

  close: () =>
    set({
      isOpen: false,
      component: null,
    }),
}))

export const modalStore = {
  isOpen: () => useModalStore.getState().isOpen,
  component: () => useModalStore.getState().component,
  open: (component: ReactNode) => useModalStore.getState().open(component),
  close: () => useModalStore.getState().close(),
}
