import stringsModule from './strings'
const { getStringByLanguage } = stringsModule

const strings = {
  en: { submit: 'submit' },
  emoji: { submit: '🚀' },
  mermish: {}
}

describe('language string', () => {
  const mockWarn = jest.fn()
  let originalWarn

  beforeEach(() => {
    originalWarn = console.warn
    console.warn = mockWarn
  })

  afterEach(() => {
    console.warn = originalWarn
  })

  test('returns correct submit string for english', () => {
    const string = getStringByLanguage('en', 'submit', strings)
    
    expect(mockWarn).not.toHaveBeenCalled()
    expect(string).toBe('submit')
  })
  
  test('returns correct submit string for emoji', () => {
    const string = getStringByLanguage('emoji', 'submit', strings)
    
    expect(mockWarn).not.toHaveBeenCalled()
    expect(string).toBe('🚀')
  })
  
  test('returns english string if language does not exist', () => {
    const string = getStringByLanguage('notALanguage', 'submit', strings)
    
    expect(mockWarn).toHaveBeenCalledWith(`Could not get string [submit] for [notALanguage]`)
    expect(string).toBe('submit')
  })
  
  test('returns english when submit key does not exist for language', () => {
    const string = getStringByLanguage('mermish', 'submit', strings)
    
    expect(mockWarn).toHaveBeenCalledWith(`Could not get string [submit] for [mermish]`)
    expect(string).toBe('submit')
  })
})