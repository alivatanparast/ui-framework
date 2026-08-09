export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassDictionary
  | ClassArray;
export interface ClassDictionary {
  [id: string]: any;
}
export interface ClassArray extends Array<ClassValue> {}

function clsx(...args: ClassValue[]): string {
  const result: string[] = [];

  for (const arg of args) {
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      result.push(String(arg));
      continue;
    }

    if (Array.isArray(arg)) {
      const inner = clsx(...arg);
      if (inner) result.push(inner);
      continue;
    }

    if (argType === 'object') {
      for (const key in arg as ClassDictionary) {
        if (Object.prototype.hasOwnProperty.call(arg, key) && (arg as ClassDictionary)[key]) {
          result.push(key);
        }
      }
    }
  }

  return result.join(' ');
}

/**
 * cn - join class names with support for arrays/objects like clsx.
 * Use like: cn('btn', { 'btn-primary': primary }, extra && 'mt-2', ['p-2', condition && 'hidden'])
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(...inputs);
}
