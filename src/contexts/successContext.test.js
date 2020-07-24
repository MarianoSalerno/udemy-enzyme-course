import React from 'react'
import { shallow, mount } from 'enzyme'
import successContext from './successContext'

const FunctionalComponent = () => {
  successContext.useSuccess()
  return <div />
}

test('useSuccess throws error when not wrapped in a SuccessProvider', () => {
  expect(() => {
    shallow(<FunctionalComponent />)
  }).toThrow('successContext does not exist')
})

test('useSuccess does not throw error when wrapped in a SuccessProvider', () => {
  expect(() => {
    mount(
      <successContext.SuccessProvider >
        <FunctionalComponent />
      </successContext.SuccessProvider>
    )
  }).not.toThrow('successContext does not exist')
})