import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr } from '../test/testUtils'
import Input from './Input'

const setup = () => {
  return shallow(<Input />)
}

test('App renders without error', () => {
  const wrapper = setup()
  const appComponent = findByTestAttr(wrapper, 'component-input')
  expect(appComponent.length).toBe(1)
})