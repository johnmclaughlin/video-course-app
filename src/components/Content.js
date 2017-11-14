import React from 'react';
import YouTube from './YouTube';
  
export default class Content extends React.Component {
render() {
    let content = this.props.content;
    var videoPlayer;
    if (content.videoRef !== 'none') {
        videoPlayer = <YouTube video={content.videoRef} autoplay="0" rel="0" modest="1" />;
    } else {
        videoPlayer = null;
    }

    return (
        <div>
            <h2>{content.title}</h2>
            <h4>{content.subtitle}</h4>
            {videoPlayer}
            <div>{content.description}</div>
        </div>
    )
    }
}