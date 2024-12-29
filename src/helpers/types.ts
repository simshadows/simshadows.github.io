/*
 * Filename: types.ts
 * Author:   simshadows <contact@simshadows.com>
 */

// Make the properties indicated by the second parameter optional.
export type SomePartial<T, TOptionals extends keyof T> = Partial<T> & Omit<T, TOptionals>;
