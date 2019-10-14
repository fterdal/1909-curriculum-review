import React from 'react'

const KittensList = props => {
  const { kittens } = props
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

export default KittensList
