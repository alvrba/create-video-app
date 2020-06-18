import React from 'react';
import {Grid, Typography, Button, TextField} from '@material-ui/core';


export default class VideoSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: ""
    }
  }


  handleSearch = (search) => {
    this.setState({search: search.target.value});
  }

  handleSubmit = (event) => {
    this.props.searchSave(this.state.search);
  }

  handleSubmitKey = (event) => {
    if (event.key === 'Enter') {
      this.props.searchSave(this.state.search);
    }
  }


  render() {

    const searchText = this.props.url.length !== 0 ? 'Cambiar video' : 'Buscar video';


    return(
      <Grid container direction="column">

        <Grid item style={{paddingBottom: '25px'}}>
          <Typography variant="h5">{searchText}</Typography>
        </Grid>

        <Grid item>
          <Grid container alignItems="center" spacing={3}>

            <Grid item xs>
              <TextField fullWidth value={this.state.search} onChange={this.handleSearch} onKeyDown={this.handleSubmitKey} label="Nombre o url del vídeo" variant="outlined" ></TextField>
            </Grid>

            <Grid item>
              <Button onClick={this.handleSubmit} variant="contained" color="primary" size="large">Buscar</Button>
            </Grid>

          </Grid>
        </Grid>

      </Grid>
    )
  }

}
