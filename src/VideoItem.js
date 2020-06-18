import React from 'react';
import {changeUrl} from './redux/actions';
import {Grid, Typography, Box, Button} from '@material-ui/core';


export default class VideoItem extends React.Component {

  handleVideo = (event) => {
    this.props.dispatch(changeUrl(this.props.id));
  }


  render() {
    return(
      <div>

          <Grid container direction="row" >

            <Grid item xs={5} lg={4} style={{padding: '5px'}}>
                <img style={{width: '100%'}} src={this.props.thumbnail} />
            </Grid>

            <Grid item xs>
              <Grid container direction="column" justify="space-between" style={{height: '100%', padding: '10px'}}>
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="h7" style={{fontWeight: 'bold'}}>{this.props.title}</Typography>
                    </Grid>
                    <Grid item style={{paddingTop: '4px'}}>
                      <Typography variant="h7" >{this.props.channel}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{paddingTop: '10px'}}>
                  <Box display="flex" flexDirection="row-reverse">
                    <Button onClick={this.handleVideo} variant="contained" color="primary">Seleccionar</Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>


          </Grid>

      </div>
    )
  }

}
