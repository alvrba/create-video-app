import React from 'react';
import Video from './video/Video';

import {changeUrl} from './redux/actions';
import {Grid, Typography} from '@material-ui/core';
import VideoCSS from './Video.css';



export default class VideoShowEdit extends React.Component {


handleDelete = (event) => {
  this.props.dispatch(changeUrl(""));
}


  render() {

    return (

      <Grid container justify="center" style={{padding: '15px'}}>

        <Grid item xs={11} style={{paddingBottom: '10px'}}>
          <Typography variant="h5">Vista previa</Typography>
        </Grid>

        <Grid item xs={11} md={10} lg={11} >
          <Video url={this.props.url} marks={this.props.marks} currentSecond={this.props.currentSecond} handleTimeVideo={this.props.handleTimeVideo} currentTime={this.props.currentTime} />
        </Grid>

        <Grid item xs={11} style={{paddingTop: '10px'}}>
          <Typography variant="h6" style={{fontWeight: 'bold'}}>{this.props.title}</Typography>
          <Typography>{this.props.description}</Typography>
        </Grid>

      </Grid>

    );
  }


}
