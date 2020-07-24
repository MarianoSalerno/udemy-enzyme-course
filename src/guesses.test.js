import React from 'react'
import { mount } from 'enzyme'
import { findByTestAttr } from '../test/testUtils'
import Input from './Input'
import successContext from './contexts/successContext'

const setup = (secretWord='party') => {
  const wrapper = mount(
    <successContext.SuccessProvider >
      <Input secretWord={ secretWord }/>
    </successContext.SuccessProvider>
  )

  const inputBox = findByTestAttr(wrapper, 'input-box')
  const submitButton = findByTestAttr(wrapper, 'submit-button')

  return [wrapper, inputBox, submitButton]
}

describe('Word guesses', () => {
  let wrapper
  let inputBox
  let submitButton

  beforeEach(() => {
    [wrapper, inputBox, submitButton] = setup('party')
  })

  describe.only('correct guess', () => {
    beforeEach(() => {
      const mockEvent = { target: { value: 'party' } }
      inputBox.simulate('change', mockEvent)
      submitButton.simulate('click')
    })

    test.only('Input component contains no children', () => {
      const inputComponent = findByTestAttr(wrapper, 'component-input')

      expect(inputComponent.children().length).toBe(0)
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
  })
})