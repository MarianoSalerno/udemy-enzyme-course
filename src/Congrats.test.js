import React from 'react'
import Congrats from './Congrats'
import { mount } from 'enzyme'
import { findByTestAttr, checkProps } from '../test/testUtils'
import languageContext from './contexts/languageContext'

const setup = ({ success, language }) => {
  language = language || 'en'
  success = success || false
  
  return mount(
    <languageContext.Provider value={language}>
      <Congrats success={ success } />
    </languageContext.Provider>
  )
}

describe('language picker', () => {
  test('correctly render congrats string in english', () => {
    const wrapper = setup({ success: true })
    
    expect(wrapper.text()).toBe('Congratulations! You guessed the word!')
  })

  test('correctly render congrats string in emoji', () => {
    const wrapper = setup({ success: true, language: 'emoji' })
    
    expect(wrapper.text()).toBe('🎯🎉')
  })
})

test('renders without error', () => {
  const wrapper = setup({})
  const component = findByTestAttr(wrapper, 'component-congrats')
  
  expect(component.length).toBe(1)
})

test('doesnt render when prop success is false', () => {
  const wrapper = setup({ success: false })
  const component = findByTestAttr(wrapper, 'component-congrats')
  
  expect(component.text()).toBe('')
})

test('renders message when prop success is true', () => {
  const wrapper = setup({success: true})
  const message = findByTestAttr(wrapper, 'congrats-message')
  
  expect(message.text().length).not.toBe(0)
})

test('does not throw warning with expected props', () => {
  const expectedProps = {success: false}
  
  checkProps(Congrats, expectedProps)
})