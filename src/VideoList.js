import React from 'react';
import VideoItem from './VideoItem';
import {Grid, Paper} from '@material-ui/core';


export default class VideoList extends React.Component {

  render() {
    return(
      <Grid container>
        {
          this.props.videoList.map((video, index) => {
            if (video.id.kind === 'youtube#video'){
              return <Grid item key={index} style={{width: '100%', paddingTop: '20px'}}><Paper><VideoItem dispatch={this.props.dispatch} id={video.id.videoId} title={video.snippet.title} description={video.snippet.description} url={video.snippet.thumbnails.medium.url} channel={video.snippet.channelTitle} thumbnail={video.snippet.thumbnails.high.url} /></Paper></Grid>
            } else {
              return null
            }
          })
        }
      </Grid>
    )
  }

}
