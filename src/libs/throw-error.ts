/**
 * Throw error based on `subject` and `message` parameters.
 *
 * @param subject error subject.
 * @param message error message.
 * @throws
 */
export function ThrowError(subject: string, message: string) {
  return Error(`${subject}: ${message}`);
}
