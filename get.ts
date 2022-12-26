export class GetError<T> extends Error {
  fieldName: string
  value: T

  constructor(name: string, value: T, fieldName = 'id') {
    const message = `Cannot get ${name.toUpperCase()} with ${fieldName}="${String(value)}".`
    super(message)

    this.fieldName = fieldName
    this.value = value
  }
}
