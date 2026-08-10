// Shared error helpers used by both bakery-public and bakery-admin.
// Imported via relative path (shared-configs is not a package).

// Firestore error codes → messages that mean something to a human.
// See https://firebase.google.com/docs/reference/js/firestore_.md#firestoreerrorcode
const FIRESTORE_MESSAGES = {
  'permission-denied':
    'Not allowed by the database security rules.',
  unavailable:
    'Cannot reach the database. Check your internet connection and try again.',
  'deadline-exceeded': 'The database took too long to respond. Please try again.',
  'not-found': 'That record no longer exists.',
  'already-exists': 'That record already exists.',
  'failed-precondition':
    'The database rejected this query — a Firestore index is probably missing.',
  'resource-exhausted': 'The database quota has been exceeded. Please try again later.',
  unauthenticated: 'Not signed in to the database.',
  cancelled: 'The request was cancelled.',
  internal: 'The database reported an internal error. Please try again.',
}

// Codes worth retrying — a transient network/backend hiccup rather than
// something a retry can never fix (bad rules, missing index, bad data).
const RETRYABLE_CODES = new Set([
  'unavailable',
  'deadline-exceeded',
  'internal',
  'cancelled',
  'aborted',
  'resource-exhausted',
])

/**
 * Turn any thrown value into a short message safe to show a user.
 */
export const describeError = (error) => {
  if (!error) return 'Unknown error'
  if (typeof error === 'string') return error

  const friendly = FIRESTORE_MESSAGES[error.code]
  if (friendly) return friendly

  return error.message || 'Unknown error'
}

/**
 * Whether retrying the same request could plausibly succeed.
 * Non-Firestore errors (no `code`) are treated as retryable, since they're
 * most often network failures.
 */
export const isRetryable = (error) => {
  if (!error || typeof error === 'string') return false
  if (!error.code) return true
  return RETRYABLE_CODES.has(error.code)
}
