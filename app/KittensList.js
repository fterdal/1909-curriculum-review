import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const KittensList = props => {
  console.log('PROPS', props)
  const { kittens } = props
  // if (kittens.loading) return null
  if (!kittens || !kittens.length) return 'No kittens...😿'
  return (
    <div>
      {kittens.map(kitten => (
        <li key={kitten.id}>
          {kitten.name} - {kitten.color}
        </li>
      ))}
    </div>
  )
}

const mapStateToProps = (entireReduxState, ownProps) => {
  console.log('OWNPROPS', ownProps)
  return {
    kittens: entireReduxState.kittens,
  }
}

export default connect(mapStateToProps)(KittensList)
