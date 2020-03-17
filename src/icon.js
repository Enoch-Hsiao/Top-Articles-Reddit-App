import React from 'react'

function Icon(props){
    return (
        <div className="column">
          <img className = "icon" src={props.link} alt=""  onClick={props.function(props.name)}/>
        </div>
    )   
}


export default Icon