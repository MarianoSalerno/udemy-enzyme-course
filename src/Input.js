import React from 'react';
import PropTypes from 'prop-types'
import languageContext from './contexts/languageContext'
import stringsModule from './helpers/strings'
import successContext from './contexts/successContext'
import { getLetterMatchCount } from './helpers'
import guessedWordsContext from './contexts/guessedWordsContext'

function Input({ secretWord }) {
  const [ currentGuess, setCurrentGuess ] = React.useState("")
  const language = React.useContext(languageContext)
  const [success, setSuccess] = successContext.useSuccess()
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords()

  if (success) { return null }
  
  return (
    <div data-test='component-input'>
      <form className="form-inline">
        <input 
          data-test="input-box" 
          className="mb-2 mx-sm-3" 
          type="text" 
          placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
          value={currentGuess} 
          onChange={(event) => setCurrentGuess(event.target.value)} />
        <button 
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={(evt) => {
            evt.preventDefault()
            const letterMatchCount = getLetterMatchCount(currentGuess, secretWord)
            const newGuessedWords = [...guessedWords, {guessedWord: currentGuess, letterMatchCount: letterMatchCount }]
            setGuessedWords(newGuessedWords)

            setSuccess(currentGuess === secretWord)
            setCurrentGuess('')
          }}>
          {stringsModule.getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  )
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired
}

export default Input;
