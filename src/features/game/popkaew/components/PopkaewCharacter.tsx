import Image from "next/image"

type PopkaewCharacterProps = {
  disabled?: boolean
  isPressed: boolean
  onPop: () => void
}

export const PopkaewCharacter = ({ disabled = false, isPressed, onPop }: PopkaewCharacterProps) => {
  return (
    <button
      type="button"
      aria-label="กดนกแก้วเพื่อเพิ่มคะแนน"
      aria-pressed={isPressed}
      disabled={disabled}
      onPointerDown={onPop}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onPop()
        }
      }}
      className="relative z-20 mx-auto flex h-63.25 w-66.75 touch-manipulation select-none items-end justify-center outline-none focus-visible:ring-4 focus-visible:ring-white/75 disabled:cursor-not-allowed disabled:opacity-80"
    >
      <Image
        src={isPressed ? "/game-popkaew/parrot-pressed.png" : "/game-popkaew/parrot-idle.png"}
        alt=""
        width={isPressed ? 267 : 237}
        height={isPressed ? 253 : 244}
        priority
        draggable={false}
        className={`pointer-events-none h-auto object-contain drop-shadow-[0_8px_8px_rgba(80,45,28,0.16)] ${
          isPressed ? "w-66.75" : "mb-1 w-59.25"
        }`}
      />
    </button>
  )
}
