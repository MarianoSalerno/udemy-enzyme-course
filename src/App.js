import React from 'react';
import './App.css';
import hookActions from './actions/hookActions';
import Input from './Input'
import LanguageContext from './contexts/languageContext'
import LanguagePicker from './languagePicker'
import successContext from './contexts/successContext'
import Congrats from './Congrats'
import GuessedWords from './GuessedWords'
import guessedWordsContext from './contexts/guessedWordsContext'

const reducer = (state, action) => {
  switch(action.type) {
    case('setSecretWord'):
      return { ...state, secretWord: action.payload }
    case('setLanguage'):
      return { ...state, language: action.payload }
    default:
      throw new Error(`Invalid action type: ${action.type}`)
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, { secretWord: null, language: 'en' })
  const setSecretWord = (secretWord) => dispatch({ type: 'setSecretWord', payload: secretWord })
  const setLanguage = (language) => dispatch({ type: "setLanguage", payload: language });

  
  React.useEffect(
    () => { hookActions.getSecretWord(setSecretWord) },
    []
  )

  if (!state.secretWord) {
    return (
      <div className='container' data-test='spinner'>
        <div className='spinner-border' role='status'>
          <span className='sr-only'>
            Loading...
          </span>
          <p>
            Loading secret word
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='container' data-test='component-app'>
      <h1> Jotto </h1>
      <LanguageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={ setLanguage } />
          <guessedWordsContext.GuessedWordsProvider >
            <successContext.SuccessProvider >
              <Congrats />
              <Input secretWord={state.secretWord} />
            </successContext.SuccessProvider>
            <GuessedWords />
          </guessedWordsContext.GuessedWordsProvider>
      </LanguageContext.Provider >
    </div>
  )
}

export default App;
