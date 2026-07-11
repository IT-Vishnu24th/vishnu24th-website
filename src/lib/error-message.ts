import th from "@/features/i18n/locales/th.json"
import en from "@/features/i18n/locales/en.json"

const locales = {
  th,
  en,
} as const

export type Locale = keyof typeof locales

export function getErrorMessage(code: string, locale: Locale = "th") {
  const messages = locales[locale].errors as Record<string, string>

  return messages[code] ?? messages.INTERNAL_ERROR ?? "Something went wrong"
}
