import React from 'react'
import { mount } from 'enzyme'
import { findByTestAttr } from '../test/testUtils'
import Input from './Input'
import successContext from './contexts/successContext'
import guessedWordsContext from './contexts/guessedWordsContext'
import GuessedWords from './GuessedWords'

const setup = (guessedWords = [], secretWord='party') => {
  const wrapper = mount(
    <guessedWordsContext.GuessedWordsProvider >
      <successContext.SuccessProvider >
        <Input secretWord={ secretWord }/>
        <GuessedWords />
      </successContext.SuccessProvider>
    </guessedWordsContext.GuessedWordsProvider>
  )

  const inputBox = findByTestAttr(wrapper, 'input-box')
  const submitButton = findByTestAttr(wrapper, 'submit-button')

  guessedWords.map((word) => {
    const mockEvent = { target: { value: 'word' }}

    inputBox.simulate('change', mockEvent)
    submitButton.simulate('click')
  })

  return [wrapper, inputBox, submitButton]
}

describe('Word guesses', () => {
  let wrapper
  let inputBox
  let submitButton

  
  describe('non empty guessed words', () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup(['agile'], 'party')
    })

    describe('correct guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'party' } }
        inputBox.simulate('change', mockEvent)
        submitButton.simulate('click')
      })
  
      test('Input component contains no children', () => {
        const inputComponent = findByTestAttr(wrapper, 'component-input')
  
        expect(inputComponent.children().length).toBe(0)
      })

      test('Table row reflects number of guesses', () => {
        const rows = findByTestAttr(wrapper, 'guessed-word')

        expect(rows.length).toBe(2)
      })
    })
  
    describe('incorrect guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'train' } }
        inputBox.simulate('change', mockEvent)
        submitButton.simulate('click')
      })
  
      test('Input box is rendered', () => {
        expect(inputBox.exists()).toBe(true)
      })

      test('Table row reflects number of guesses', () => {
        const rows = findByTestAttr(wrapper, 'guessed-word')

        expect(rows.length).toBe(2)
      })
    })
  })

  describe('empty guessed words', () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup([], 'party')
    })

    test('Table row reflects number of guesses', () => {
      const mockEvent = { target: { value: 'train' } }
      inputBox.simulate('change', mockEvent)
      submitButton.simulate('click')
      const rows = findByTestAttr(wrapper, 'guessed-word')

      expect(rows.length).toBe(1)
    })
  })
})