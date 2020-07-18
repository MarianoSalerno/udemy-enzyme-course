import moxios from 'moxios'
import { getSecretWord } from './hookActions'

describe('Moxios tests', ( () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  test('calls the getSecretWord callback on axios response', async () => {
    const secretWord = 'party'
    const mockSetSecretWord = jest.fn()

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: secretWord
      })
    })
    await getSecretWord(mockSetSecretWord)

    expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord)
  })
}))