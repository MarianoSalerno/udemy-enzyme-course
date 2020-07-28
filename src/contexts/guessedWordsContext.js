import React from 'react'

const guessedWordsContext = React.createContext()

const useGuessedWords = () => {
  const context = React.useContext(guessedWordsContext)
  
  if (!context) {
    throw new Error('guessedWordsContext does not exist')
  }

  return context
}

const GuessedWordsProvider = (props) => {
  const [guessedWords, setGuessedWords] = React.useState([])

  const value = React.useMemo( () => [guessedWords, setGuessedWords], [guessedWords])

  return <guessedWordsContext.Provider value={value} {...props} />
}

export default { GuessedWordsProvider, useGuessedWords }