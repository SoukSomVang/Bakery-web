// Shared sorting helpers used by both bakery-public and bakery-admin.
// Imported via relative path (shared-configs is not a package).

/**
 * Normalize a createdAt value to a millisecond timestamp.
 * Handles Firestore Timestamp, plain {seconds}, Date, ISO string and number.
 * Returns 0 for missing/unparsable values so those items sort last (desc).
 */
export const toMillis = (value) => {
  if (!value) return 0

  // Firestore Timestamp
  if (typeof value.toDate === 'function') return value.toDate().getTime()
  if (typeof value.seconds === 'number') return value.seconds * 1000

  if (value instanceof Date) return value.getTime()

  if (typeof value === 'number') return value

  if (typeof value === 'string') {
    const parsed = new Date(value).getTime()
    return Number.isNaN(parsed) ? 0 : parsed
  }

  return 0
}

/**
 * Sort a list of documents by `createdAt`, newest first.
 * Done client-side (instead of a Firestore orderBy) so documents that are
 * missing `createdAt` are still returned instead of being dropped by the query,
 * and so no composite index is needed when combined with a `where` filter.
 * Returns a new array; the input is not mutated.
 */
export const sortByCreatedAtDesc = (items = [], field = 'createdAt') =>
  [...items].sort((a, b) => toMillis(b?.[field]) - toMillis(a?.[field]))
