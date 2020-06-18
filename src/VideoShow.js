import React from 'react';
import {changeUrl} from './redux/actions';
import {Grid, Typography, Box, Button} from '@material-ui/core';
import VideoCSS from './Video.css';



export default class VideoShow extends React.Component {


handleDelete = (event) => {
  this.props.dispatch(changeUrl(""));
}


  render() {
    const source = 'https://www.youtube.com/embed/'+this.props.url;

    return (

      <Grid container justify="center" style={{padding: '15px'}}>

        <Grid item xs={11} style={{paddingBottom: '10px'}}>
          <Typography variant="h5">Vista previa</Typography>
        </Grid>

        <Grid item xs={11} md={10} lg={11} >
          <div class="video-responsive">
            <iframe frameBorder="0" width="100%" src={source} allowFullScreen title='Video player'/>
          </div>
        </Grid>

        <Grid item xs={11} style={{paddingTop: '10px'}}>
          <Typography variant="h6" style={{fontWeight: 'bold'}}>{this.props.title}</Typography>
          <Typography>{this.props.description}</Typography>
        </Grid>

        <Grid item xs={11} style={{paddingTop: '10px'}}>
          <Box display="flex" flexDirection="row-reverse">
            { this.props.url.length !== 0
              ? <Button onClick={this.handleDelete} variant="contained" color="primary" >Eliminar video</Button>
              : <Button disabled onClick={this.handleDelete} variant="contained" color="primary" >Eliminar video</Button>
            }
          </Box>
        </Grid>

      </Grid>

    );
  }


}
