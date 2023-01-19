import { Causable } from "../types/causable";

export function isCausable<T>(input: unknown): input is Causable {
    return !!(input as any).code
}
