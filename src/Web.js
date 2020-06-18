import React from 'react';

import {Grid, Typography, TextField} from '@material-ui/core';
import VideoCSS from './Video.css';



export default class Web extends React.Component {


    handleUrl = (url) => {
      this.props.urlSave(url.target.value);
    }

    handleDescription = (description) => {
      this.props.descriptionSave(description.target.value);
    }

    handleReason = (reason) => {
      this.props.reasonSave(reason.target.value);
    }


  render() {

    return(
      <Grid container direction="column" justify="flex-start">
        <Grid item style={{paddingBottom: '15px'}}>
          <Typography variant="h6" style={{fontWeight: 'bold'}}>Web</Typography>
        </Grid>
        <Grid item style={{paddingBottom: '15px'}}>
          <TextField fullWidth style={{}} value={this.props.content.description} onChange={this.handleDescription} label="Descripción" variant="outlined" multiline rows={6}></TextField>
        </Grid>
        <Grid item>
          <TextField fullWidth value={this.props.content.url} onChange={this.handleUrl} label="URL" variant="outlined"></TextField>
        </Grid>

        <Grid item style={{paddingBottom: '15px', paddingTop: '30px'}}>
          <Typography variant="h7">Vista previa</Typography>
        </Grid>
        <Grid class="video-responsive" item style={{border: '2px solid', borderRadius: '5px', borderColor: '#c4c4c4'}}>
            <iframe frameBorder="0" width="100%" title="Mark website" src={this.props.content.url}></iframe>
        </Grid>

        <Grid item style={{paddingBottom: '15px', paddingTop: '30px'}}>
          <Typography variant="h7">Explicación opcional</Typography>
        </Grid>
        <Grid item>
          <TextField fullWidth style={{}} value={this.props.content.reason} onChange={this.handleReason} label="Descripción" variant="outlined" multiline rows={6}></TextField>
        </Grid>
      </Grid>
    )
  }

}
