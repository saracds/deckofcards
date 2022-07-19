import React from 'react'

const Card = ({source}) => {
  return (
    <div>
        {console.log(source)}
        <img src="{source}" />
    </div>
  )
}

export default Card
