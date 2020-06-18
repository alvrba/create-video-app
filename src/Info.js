import React from 'react';

import {Grid, Typography, TextField} from '@material-ui/core';


export default class Info extends React.Component {


    handleDescription = (description) => {
      this.props.descriptionSave(description.target.value);
    }

    handleReason = (reason) => {
      this.props.reasonSave(reason.target.value);
    }


  render() {

    return(
      <Grid container direction="column">
        <Grid item  style={{paddingBottom: '15px'}}>
          <Typography variant="h6" style={{fontWeight: 'bold'}}>Información</Typography>
        </Grid>
        <Grid item>
          <TextField fullWidth style={{}} value={this.props.content.description} onChange={this.handleDescription} label="Descripción" variant="outlined" multiline rows={10}></TextField>
        </Grid>
        <Grid item style={{paddingBottom: '15px', paddingTop: '30px'}}>
          <Typography variant="h7">Explicación opcional</Typography>
        </Grid>
        <Grid item>
          <TextField fullWidth value={this.props.content.reason} onChange={this.handleReason} label="Descripción" variant="outlined" multiline rows={6}></TextField>
        </Grid>
      </Grid>
    )
  }

}
