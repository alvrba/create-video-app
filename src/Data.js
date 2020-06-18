import React from 'react';
import {changeTitle, changeDescription} from './redux/actions';
import {Grid, Typography, TextField} from '@material-ui/core';


export default class Data extends React.Component {

  handleTitle = (title) => {
    this.props.dispatch(changeTitle(title.target.value));
  }

  handleDescription = (description) => {
    this.props.dispatch(changeDescription(description.target.value));
  }


  render() {
    return(
      <Grid container direction="column">

        <Grid item style={{paddingBottom: '25px'}}>
          <Typography variant="h5">Datos básicos</Typography>
        </Grid>

        <Grid item >
          <TextField fullWidth style={{ maxlength: '10'}} value={this.props.title} onChange={this.handleTitle} label="Título" variant="outlined" ></TextField>
        </Grid>

        <Grid item style={{paddingTop: '25px'}}>
          <TextField fullWidth value={this.props.description } onChange={this.handleDescription} label="Descripción" variant="outlined" multiline rows={6}></TextField>
        </Grid>

      </Grid>
    )
  }

}
