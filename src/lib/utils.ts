import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

type DateInput = string | number | Date
type FormatDateOptions = Intl.DateTimeFormatOptions & { locale?: string }

export function formatDate(
  value: DateInput,
  options?: FormatDateOptions,
): string {
  const date =
    value instanceof Date ? value : new Date(typeof value === 'number' ? value : value ?? '')

  if (Number.isNaN(date.getTime())) {
    return typeof value === 'string' ? value : ''
  }

  const { locale = 'fr-FR', ...formatOptions } = options ?? {}

  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...formatOptions,
  }).format(date)
}
