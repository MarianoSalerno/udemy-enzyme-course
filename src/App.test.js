import React from 'react'
import App from './App'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new EnzymeAdapter()})

test('renders without error', () => {
  const wrapper = shallow(<App />)
  const appComponent = wrapper.find('[data-test="component-app"]')
  expect(appComponent.length).toBe(1)
})

test('renders increment button', () => {
  const wrapper = shallow(<App />)
})

test('renders display counter', () => {
  const wrapper = shallow(<App />)
})

test('counter starts at 0', () => {
  const wrapper = shallow(<App />)
})

test('clicking button increments counter', () => {
  const wrapper = shallow(<App />)
})