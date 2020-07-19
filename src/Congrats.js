import React from 'react'
import PropTypes from 'prop-types'
import languageContext from './contexts/languageContext'
import stringsModule from './helpers/strings'

const Congrats = (props) => {
  const language = React.useContext(languageContext)
  if (props.success) {
    return (
      <div className='alert alert-success' data-test='component-congrats'>
        <span data-test='congrats-message'>
          {stringsModule.getStringByLanguage(language, 'congrats')}
        </span>
      </div>
    )
  } else {
    return (
      <div data-test='component-congrats' />
    )
  }
}

Congrats.propTypes = {
  success: PropTypes.bool.isRequired
}

export default Congrats
