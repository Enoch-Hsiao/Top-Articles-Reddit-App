import React from 'react'

function Banner(props){
    const divStyle = {
        backgroundColor: "#191919",
        width: "100%",
        height: "240px",
        overflow: "hidden",
        font: "verdana",
        color: "#E8E8E8",
        margin: "auto",
        alignItems: "center",
        textAlign: "center",
    }
    const divStyleWithoutData = {
        backgroundColor: "#191919",
        width: "100%",
        height: "100px",
        overflow: "hidden",
        font: "verdana",
        color: "#E8E8E8",
        margin: "auto",
        alignItems: "center",
        textAlign: "center",
    }
    const iconStyle = {
        borderRadius: "50%",
        width: "100px",
        margin: "auto",
        padding: "0px",
        display: "block",
    }

    const bannerStyle = {
        width: "100%",
        margin: "auto",
        padding: "0px",
        display: "block",
    }

    if(props.data.data === false) {
        return (
            <div>
                <img src="https://i.imgur.com/ki6Zzu2.png" alt = "reddit" style = {bannerStyle}/>     
                <div className = "banner" style = {divStyleWithoutData}>        
                    <h1>Top articles from r/{props.data.name}</h1>       
                </div>
            </div>
        )
    } else if (props.data.icon !== ""){
      return (
            <div>
                <img src={props.data.background} alt="" style = {bannerStyle}/>          
                <div className = "banner" style = {divStyle}>      
                    <h2>{props.data.title}</h2>
                    <h4>r/{props.data.name}  {props.data.subscribers} subscribers</h4>  
                    <img src={props.data.icon} alt="" style = {iconStyle}/>          
                </div>
            </div>
      )
    } else if( props.data.icon2 !== ""){
        return (
            <div>
                <img src={props.data.background} alt="" style = {bannerStyle}/>          
                <div className = "banner" style = {divStyle}>      
                    <h2>{props.data.title}</h2>
                    <h4>r/{props.data.name}  {props.data.subscribers} subscribers</h4>  
                    <img src={props.data.icon2} alt="" style = {iconStyle}/>          
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <img src={props.data.background} alt="" style = {divStyleWithoutData}/>          
                <div className = "banner" style = {divStyleWithoutData}>      
                    <h2>{props.data.title}</h2>
                    <h4>r/{props.data.name}  {props.data.subscribers} subscribers</h4>        
                </div>
            </div>
        )
    }
}
export default Banner