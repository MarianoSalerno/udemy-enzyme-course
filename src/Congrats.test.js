import React from 'react'
import Congrats from './Congrats'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { findByTestAttr } from '../test/testUtils'

Enzyme.configure({adapter: new EnzymeAdapter()})

const setup = (props={}) => {
  return shallow(<Congrats {...props}/>)
}

test('renders without error', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'component-congrats')
  expect(component.length).toBe(1)
})

test('doesnt render when prop success is false', () => {
  const wrapper = setup({success: false})
  const component = findByTestAttr(wrapper, 'component-congrats')
  expect(component.text()).toBe('')
})

test('renders message when prop success is true', () => {
  const wrapper = setup({success: true})
  const message = findByTestAttr(wrapper, 'congrats-message')
  expect(message.text().length).not.toBe(0)
})