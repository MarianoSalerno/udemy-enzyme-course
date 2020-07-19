import React from 'react'
import { mount } from 'enzyme'
import { findByTestAttr, checkProps } from '../test/testUtils'
import Input from './Input'
import languageContext from './contexts/languageContext'

const setup = ({ secretWord, language }) => {
  secretWord = secretWord || 'party'
  language = language || 'en'

  return mount(
    <languageContext.Provider value={language}>
      <Input secretWord={ secretWord }/>
    </languageContext.Provider>
  )
}

test('App renders without error', () => {
  const wrapper = setup({})
  const appComponent = findByTestAttr(wrapper, 'component-input')
  
  expect(appComponent.length).toBe(1)
})

test('does not throw warning with expected props', () => {
  checkProps(Input, {secretWord: 'party'})
})

describe('language picker', () => {
  test('correctly render submit string in english', () => {
    const wrapper = setup({})
    const submitButton = findByTestAttr(wrapper, 'submit-button')
    
    expect(submitButton.text()).toBe('Submit')
  })

  test('correctly render submit string in emoji', () => {
    const wrapper = setup({language: 'emoji'})
    const submitButton = findByTestAttr(wrapper, 'submit-button')
    
    expect(submitButton.text()).toBe('🚀')
  })
})

describe("State controlled input field", () => {
  let mockSetCurrentGuess = jest.fn()
  let wrapper

  beforeEach(() => {
    mockSetCurrentGuess.mockClear()
    React.useState = jest.fn(() => ['', mockSetCurrentGuess])
    wrapper = setup({})
  })

  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box')
    const mockEvent ={ target: { value: 'train' } }

    inputBox.simulate('change', mockEvent)

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train')
  })

  test('state is cleared when submit button is clicked', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button')
    
    submitButton.simulate('click', { preventDefault: () => {} })

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('')
  })

})