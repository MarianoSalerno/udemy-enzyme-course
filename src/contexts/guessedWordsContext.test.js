import React from 'react'
import { shallow, mount } from 'enzyme'
import guessedWordsContext from './guessedWordsContext'

const FunctionalComponent = () => {
  guessedWordsContext.useGuessedWords()
  return <div />
}

test('useGuessedWords throws error when not wrapped in a GuessedWordsProvider', () => {
  expect(() => {
    shallow(<FunctionalComponent />)
  }).toThrow('guessedWordsContext does not exist')
})

test('useGuessedWords does not throw error when wrapped in a GuessedWordsProvider', () => {
  expect(() => {
    mount(
      <guessedWordsContext.GuessedWordsProvider >
        <FunctionalComponent />
      </guessedWordsContext.GuessedWordsProvider>
    )
  }).not.toThrow('guessedWordsContext does not exist')
})