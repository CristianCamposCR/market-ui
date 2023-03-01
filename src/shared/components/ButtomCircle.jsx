import React from 'react'
import FeatherIcon from 'feather-icons-react'

const ButtomCircle = ({type, onClick, icon = "", size = 15}) => {
  return (
    <button className={type} onClick={onClick} >
        {
            icon && (
                <FeatherIcon 
                icon={icon} 
                size={size}
                style={{strokeWidth: 2.5}}
                />
            )
        }
    </button>
  )
}

export default ButtomCircle
