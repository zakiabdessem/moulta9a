import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncateContent = (content: string, length: number) => {
  return content.length > length ? `${content.slice(0, length)}...` : content
}
