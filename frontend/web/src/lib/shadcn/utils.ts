/* note:
- DO NOT RENAME OR MOVE THIS FILE - used by components.json
- File created by shadcn cli
*/

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
