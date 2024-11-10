import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { set as setTime } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
