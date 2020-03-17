import React from 'react'
import Iframe from 'react-iframe'
function Post(props){

    let url = "https://www.reddit.com" + props.permalink;
    let media = <img src={props.url} alt="" className = "media"/>
    let title = props.title.replace("&amp;" , "&");
    if(props.is_video){
        if(props.media.reddit_video !== null){
            let link = props.media.reddit_video.fallback_url;
            media = <Iframe src={link}
            frameBorder='0'
            allowFullScreen
            title='video' 
            width="500px"
            height="500px"
            position="relative"
            align="center"
            display="initial"
            />;
        } else if(props.media.oembed !== null) {
            media = props.media.oembed.html;
       }
    }
    let mediaURL = props.url.substring(8, 35) + "...";
    return (
        <div className = "box">
            <div className = "title">
                <a href= {url}>{title}</a> 
            </div> 
            <div className = "title">
                <a href= {props.url} className = "link">{mediaURL}</a> 
            </div>
            <h3>Upvotes: {props.upvotes} Comments: {props.comments}</h3>
            {media}
        </div>
    )   
}

export default Post