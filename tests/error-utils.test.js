import test from 'node:test'
import assert from 'node:assert/strict'

import { describeError, isRetryable } from '../shared-configs/error-utils.js'

// Shape of a real FirebaseError
const firestoreError = (code, message = 'raw sdk message') =>
  Object.assign(new Error(message), { code, name: 'FirebaseError' })

test('describeError maps known Firestore codes to readable text', () => {
  assert.match(describeError(firestoreError('permission-denied')), /security rules/i)
  assert.match(describeError(firestoreError('unavailable')), /internet connection/i)
  assert.match(describeError(firestoreError('failed-precondition')), /index/i)
})

test('describeError falls back to the raw message for unknown codes', () => {
  assert.equal(
    describeError(firestoreError('some-new-code', 'something odd happened')),
    'something odd happened',
  )
})

test('describeError handles plain Errors, strings and nothing at all', () => {
  assert.equal(describeError(new Error('boom')), 'boom')
  assert.equal(describeError('already a message'), 'already a message')
  assert.equal(describeError(null), 'Unknown error')
  assert.equal(describeError(undefined), 'Unknown error')
  assert.equal(describeError({}), 'Unknown error')
})

test('isRetryable is true for transient backend failures', () => {
  assert.equal(isRetryable(firestoreError('unavailable')), true)
  assert.equal(isRetryable(firestoreError('deadline-exceeded')), true)
  assert.equal(isRetryable(firestoreError('internal')), true)
})

test('isRetryable is false for failures a retry cannot fix', () => {
  // Retrying these 3x with a 2s wait only delays showing the user the problem
  assert.equal(isRetryable(firestoreError('permission-denied')), false)
  assert.equal(isRetryable(firestoreError('failed-precondition')), false)
  assert.equal(isRetryable(firestoreError('not-found')), false)
  assert.equal(isRetryable(firestoreError('invalid-argument')), false)
})

test('isRetryable treats codeless errors as retryable network failures', () => {
  assert.equal(isRetryable(new Error('Failed to fetch')), true)
})

test('isRetryable is false for nothing / strings', () => {
  assert.equal(isRetryable(null), false)
  assert.equal(isRetryable(undefined), false)
  assert.equal(isRetryable('a string'), false)
})
