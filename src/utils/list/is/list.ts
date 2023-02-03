export function isList<T>(input: T[]): input is T[] {
    return Array.isArray(input)
}
