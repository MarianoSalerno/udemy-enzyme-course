import React from 'react'
import { mount } from 'enzyme'
import { findByTestAttr } from '../test/testUtils'
import App from './App'
import hookActions from './actions/hookActions'

const mockGetSecretWord = jest.fn()

const setup = (secretWord="party") => {
  mockGetSecretWord.mockClear()
  hookActions.getSecretWord = mockGetSecretWord
  const mockUseReducer = jest.fn().mockReturnValue([{secretWord, language: 'en'}, jest.fn()])
  React.useReducer = mockUseReducer

  return mount(<App />)
}

test('App renders without error', () => {
  const wrapper = setup()
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent.length).toBe(1)
})

describe('getSecretWord calls', () => {
  test('gets called on App mount', () => {
    setup()

    expect(mockGetSecretWord).toHaveBeenCalled()
  })

  test('does not get called on App update', () => {
    const wrapper = setup()
    mockGetSecretWord.mockClear()
    wrapper.setProps()

    expect(mockGetSecretWord).not.toHaveBeenCalled()
  })
})

describe('secretWord is not null', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = setup('party')
  })

  test('renders app without errors', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app')

    expect(appComponent.exists()).toBe(true)
  })

  test('does not render spinner', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner')

    expect(spinnerComponent.exists()).toBe(false)
  })
})

describe('secretWord is null', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = setup(null)
  })

  test('does not render app', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app')

    expect(appComponent.exists()).toBe(false)
  })

  test('renders spinner', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner')

    expect(spinnerComponent.exists()).toBe(true)
  })
})