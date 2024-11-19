import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { set as setTime } from 'date-fns';

import { toast } from 'sonner';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface copyToClipboardProps {
  value: string;
  message?: string;
}

export function copyToClipboard({
  value,
  message = 'Copiado al portapapeles',
}: copyToClipboardProps) {
  navigator.clipboard.writeText(value);
  toast(message, {
    duration: 1500,
  });
}

// ? Time
export function timeToInt(time: string) {
  return parseFloat(time.replace(':', '.'));
}

export function setTimeToADate(date: Date, time: string): Date {
  const [hours, minutes] = time.split(':').map(Number);
  return setTime(date, { hours, minutes });
}

// ? Currency
export const formatToMxn = (value: number): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(value);
};
