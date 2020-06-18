import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default class TopBar extends React.Component {



  render() {
    return(
      <Grid container alignItems="center" spacing={2} style={{paddingLeft: '10px'}}>

        <Grid item >
          <Typography variant="h5"><b>Video</b></Typography>
        </Grid>

        <Grid item >
          <ArrowForwardIosIcon />
        </Grid>

        <Grid item >
          <Typography variant="h5"><b>{this.props.title}</b></Typography>
        </Grid>


      </Grid>
    )
  }

}
