import React from 'react';
import VideoSearch from './VideoSearch';
import VideoList from './VideoList';

import {Grid, Typography} from '@material-ui/core';


export default class VideoGeneral extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      videos: [],
      hasError: false
    }
  }


  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }


  searchSave = (search) => {
    fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&key=AIzaSyBVziNgcuvZJX7dZM63aAmDUJs7ZWY_6eo&q='+search)
    .then((data) => data.json())
    .then((videos) => {
      this.setState({videos: videos.items})
    })
    .catch((error) => console.log(error))
  }


  render() {
    if (this.state.hasError) {
      return <Typography style={{paddingTop: '20px'}}>Error al cargar los videos</Typography>
    } else {
      return(
        <Grid container style={{paddingTop: '20px'}}>

          <VideoSearch searchSave={this.searchSave} url={this.props.url} />
          <VideoList dispatch={this.props.dispatch} videoList={this.state.videos} />

        </Grid>
      )
    }
  }

}
