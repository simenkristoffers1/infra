/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateOperation } from '@/types/server-sent-events';
export function updateObjectAtPathImmutable<T>(
  obj: T,
  path: string,
  operation: UpdateOperation,
  value: unknown
): T {
  const keys = path.split('/');

  function helper(curr: any, idx: number): any {
    if (idx === keys.length - 1) {
      const lastKey = keys[idx];
      if (operation === 'set') {
        return {
          ...curr,
          [lastKey]: value,
        };
      }
      if (operation === 'append') {
        const oldVal = curr[lastKey];
        let newVal;
        if (Array.isArray(oldVal)) {
          newVal = Array.isArray(value) ? [...oldVal, ...value] : [...oldVal, value];
        } else if (typeof oldVal === 'string' || typeof oldVal === 'number') {
          newVal = (oldVal as any) + (value as any);
        } else {
          throw new Error(`Cannot perform 'append' on non-string/non-number at path '${path}'`);
        }
        return {
          ...curr,
          [lastKey]: newVal,
        };
      }
      throw new Error(`Unknown operation '${operation}'`);
    } else {
      const key = keys[idx];
      return {
        ...curr,
        [key]: helper(curr[key], idx + 1),
      };
    }
  }

  return helper(obj, 0);
}
