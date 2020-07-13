import { getLetterMatchCount } from './index'

describe('getLetterMatchCount', () => {
  const secretWord = 'party'

  test('returns correct count when no matches', () => {
    const letterMatchCount = getLetterMatchCount('bone', secretWord)
    expect(letterMatchCount).toBe(0)
  })

  test('returns correct count when there are 3 matches', () => {
    const letterMatchCount = getLetterMatchCount('train', secretWord)
    expect(letterMatchCount).toBe(3)
  })

  test('returns correct count when there are duplicate matches', () => {
    const letterMatchCount = getLetterMatchCount('parka', secretWord)
    expect(letterMatchCount).toBe(3)
  })
})