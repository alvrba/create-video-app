import React from 'react';

import {Grid, TextField} from '@material-ui/core';



export default class Blocks extends React.Component {

  handleReturnTime = (returnTime) => {
    const timeInt = parseInt(returnTime.target.value);
    this.props.blocksSave(timeInt);
  }


  handleHours = (hours) => {
    this.props.hoursReturnSave(hours.target.value);
  }

  handleMinutes = (minutes) => {
    this.props.minutesReturnSave(minutes.target.value);
  }

  handleSeconds = (seconds) => {
    this.props.secondsReturnSave(seconds.target.value);
  }


  render() {
      return(
        <Grid container justify="flex-start" spacing={2} style={{paddingTop: '15px'}}>
          <Grid item style={{paddingRight: '20px'}}>
            <TextField value={this.props.returnTimeHMS[0]} onChange={this.handleHours} label="Horas" variant="outlined" inputProps={{maxLength: 2}}></TextField>
          </Grid>
          <Grid item style={{paddingRight: '20px'}}>
            <TextField value={this.props.returnTimeHMS[1]} onChange={this.handleMinutes} label="Minutos" variant="outlined" inputProps={{maxLength: 2}}></TextField>
          </Grid>
          <Grid item>
            <TextField value={this.props.returnTimeHMS[2]} onChange={this.handleSeconds} label="Segundos" variant="outlined" inputProps={{maxLength: 2}}></TextField>
          </Grid>
        </Grid>
      )

    }
}
