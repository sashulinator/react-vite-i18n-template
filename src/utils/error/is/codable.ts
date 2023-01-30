import { Codable } from "../types/codable";

export function isCodable<T>(input: unknown): input is Codable {
  return !!(input as any).code
}
