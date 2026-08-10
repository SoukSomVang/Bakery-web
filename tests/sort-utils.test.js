import test from 'node:test'
import assert from 'node:assert/strict'

import { sortByCreatedAtDesc, toMillis } from '../shared-configs/sort-utils.js'

// Stand-in for a Firestore Timestamp: what the SDK actually hands back
const firestoreTimestamp = (iso) => ({
  seconds: Math.floor(new Date(iso).getTime() / 1000),
  nanoseconds: 0,
  toDate: () => new Date(iso),
})

test('toMillis reads a Firestore Timestamp via toDate()', () => {
  assert.equal(
    toMillis(firestoreTimestamp('2026-03-01T00:00:00Z')),
    Date.parse('2026-03-01T00:00:00Z'),
  )
})

test('toMillis falls back to the seconds field when toDate() is absent', () => {
  // Firestore data that has been through JSON serialization loses its methods
  assert.equal(
    toMillis({ seconds: 1700000000, nanoseconds: 0 }),
    1700000000 * 1000,
  )
})

test('toMillis handles Date, ISO string and number', () => {
  assert.equal(toMillis(new Date('2026-01-02T03:04:05Z')), Date.parse('2026-01-02T03:04:05Z'))
  assert.equal(toMillis('2026-01-02T03:04:05Z'), Date.parse('2026-01-02T03:04:05Z'))
  assert.equal(toMillis(1234567890), 1234567890)
})

test('toMillis returns 0 for missing or unparsable values', () => {
  assert.equal(toMillis(undefined), 0)
  assert.equal(toMillis(null), 0)
  assert.equal(toMillis(''), 0)
  assert.equal(toMillis('not a date'), 0)
  assert.equal(toMillis({}), 0)
})

test('sorts newest first', () => {
  const items = [
    { name: 'old', createdAt: firestoreTimestamp('2024-01-01T00:00:00Z') },
    { name: 'newest', createdAt: firestoreTimestamp('2026-08-01T00:00:00Z') },
    { name: 'middle', createdAt: firestoreTimestamp('2025-05-01T00:00:00Z') },
  ]

  assert.deepEqual(
    sortByCreatedAtDesc(items).map((i) => i.name),
    ['newest', 'middle', 'old'],
  )
})

test('sorts correctly across mixed createdAt formats', () => {
  const items = [
    { name: 'string', createdAt: '2025-06-01T00:00:00Z' },
    { name: 'timestamp', createdAt: firestoreTimestamp('2026-08-01T00:00:00Z') },
    { name: 'date', createdAt: new Date('2026-01-01T00:00:00Z') },
    { name: 'seconds', createdAt: { seconds: Math.floor(Date.parse('2024-01-01T00:00:00Z') / 1000) } },
  ]

  assert.deepEqual(
    sortByCreatedAtDesc(items).map((i) => i.name),
    ['timestamp', 'date', 'string', 'seconds'],
  )
})

test('items without createdAt are kept, and sort last', () => {
  const items = [
    { name: 'no-date-1' },
    { name: 'dated', createdAt: firestoreTimestamp('2025-01-01T00:00:00Z') },
    { name: 'no-date-2', createdAt: null },
  ]

  const sorted = sortByCreatedAtDesc(items)

  // This is the whole reason the sort is client-side: a Firestore
  // orderBy('createdAt') would have dropped both undated items.
  assert.equal(sorted.length, 3)
  assert.equal(sorted[0].name, 'dated')
  assert.deepEqual(sorted.slice(1).map((i) => i.name).sort(), ['no-date-1', 'no-date-2'])
})

test('does not mutate the input array', () => {
  const items = [
    { name: 'a', createdAt: firestoreTimestamp('2024-01-01T00:00:00Z') },
    { name: 'b', createdAt: firestoreTimestamp('2026-01-01T00:00:00Z') },
  ]
  const original = [...items]

  sortByCreatedAtDesc(items)

  assert.deepEqual(items, original)
})

test('handles empty input and no input', () => {
  assert.deepEqual(sortByCreatedAtDesc([]), [])
  assert.deepEqual(sortByCreatedAtDesc(), [])
})

test('tolerates null entries in the array', () => {
  const sorted = sortByCreatedAtDesc([null, { name: 'a', createdAt: 5 }])
  assert.equal(sorted.length, 2)
  assert.equal(sorted[0].name, 'a')
})

test('accepts an alternative date field', () => {
  const items = [
    { name: 'a', updatedAt: 100 },
    { name: 'b', updatedAt: 300 },
    { name: 'c', updatedAt: 200 },
  ]

  assert.deepEqual(
    sortByCreatedAtDesc(items, 'updatedAt').map((i) => i.name),
    ['b', 'c', 'a'],
  )
})
