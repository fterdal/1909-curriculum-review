import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import store, { fetchKittens } from './store'

const UnconnectedSingleKitten = props => {
  const { kitten } = props
  return (
    <div>
      {kitten.name} - {kitten.color}
    </div>
  )
}

const mapState = (state) => {
  return {
    singleKitten: state.singleKitten
  }
}

const mapDispatch = dispatch => {
  return {
    deleteKitten: () => dispatch(deleteKitten())
  }
}

const SingleKitten = connect(mapState, mapDispatch)(UnconnectedSingleKitten)

class KittensListConnected extends React.Component {
  constructor() {
    super()
    this.state = { kittens: [] }
    this.state.kittens = store.getState().kittens
    console.log('Redux in constructor', store.getState())
    this.unsubscribe = null
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      const { kittens } = store.getState()
      console.log('subscription is firing', kittens)
      this.setState({
        kittens,
      })
    })
  }
  componentWillUnmount() {
    console.log('UNMOUNTING')
    if (this.unsubscribe) this.unsubscribe()
  }
  render() {
    const { kittens } = this.state
    if (!kittens || !kittens.length) return 'No kittens...😿'
    return (
      <div>
        {kittens.map(kitten => (
          <li style={{ listStyle: 'none' }} key={kitten.id}>
            <SingleKitten kitten={kitten} />
          </li>
        ))}
      </div>
    )
  }
}

export default KittensListConnected

// const KittensList = props => {
//   // console.log('PROPS', props)
//   const { kittens } = props
//   // if (kittens.loading) return null
//   if (!kittens || !kittens.length) return 'No kittens...😿'
//   return (
//     <div>
//       {kittens.map(kitten => (
//         <li key={kitten.id}>
//           {kitten.name} - {kitten.color}
//         </li>
//       ))}
//     </div>
//   )
// }

// const mapStateToProps = (entireReduxState, ownProps) => {
//   // console.log('OWNPROPS', ownProps)
//   console.log('entireReduxState', entireReduxState)
//   return {
//     kittens: entireReduxState.kittens,
//   }
// }

// export default connect(mapStateToProps)(KittensList)
