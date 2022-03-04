import React from 'react'
import './Die.css'

function Die(props) {
  const styles={
    backgroundColor: props.isHeld? '#59E391' : '#fff'
  }
  function clickHandler(){
    props.holdFunction(props.id)
    
  }
  return (
    <div className='Die' style={styles} onClick={clickHandler}>
        <h2>
            {props.value}
            {/* {console.log(props.isHeld)} */}
        </h2>
    </div>
  )
}

export default Die