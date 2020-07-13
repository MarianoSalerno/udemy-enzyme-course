import React from 'react'
import App from './App'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new EnzymeAdapter()})

const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props}/>)
  if (state) wrapper.setState(state)
  return wrapper
}

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`)
}

test('renders without error', () => {
  const wrapper = setup()
  const appComponent = findByTestAttr(wrapper, 'component-app')

  expect(appComponent.length).toBe(1)
})

test('renders increment button', () => {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'increment-button')

  expect(button.length).toBe(1)
})

test('renders display counter', () => {
  const wrapper = setup()
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')

  expect(counterDisplay.length).toBe(1)
})

test('counter starts at 0', () => {
  const wrapper = setup()
  const initialState = wrapper.state('counter')

  expect(initialState).toBe(0)
})

test('clicking button increments counter', () => {
  const counter = 7
  const wrapper = setup(null, { counter})
  const button = findByTestAttr(wrapper, 'increment-button')
  button.simulate('click')
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')

  expect(counterDisplay.text()).toContain(counter + 1)
})