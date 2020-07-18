import React from 'react'
import { mount } from 'enzyme'
import { findByTestAttr } from '../test/testUtils'
import App from './App'
import hookActions from './actions/hookActions'

const mockGetSecretWord = jest.fn()

const setup = () => {
  mockGetSecretWord.mockClear()
  hookActions.getSecretWord = mockGetSecretWord
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
