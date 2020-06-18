import React from 'react';
import MarkInfoEditing from './MarkInfoEditing';
import {deleteMark} from './redux/actions';
import {Grid, Paper, Typography, Box, Button} from '@material-ui/core';
import {Delete} from '@material-ui/icons/';

export default class MarkItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        editing: false
    };
  }

  handleDelete = (event) => {
    this.props.dispatch(deleteMark(this.props.index));
  }

  handleEdit = (event) => {
    let newEditing = !this.state.editing;
    this.setState({editing: newEditing});
  }



  render() {

    let time = '00:00';
    const hoursText = this.props.mark.timeHMS[0].toString().padStart(2,'0');
    const minutesText = this.props.mark.timeHMS[1].toString().padStart(2,'0');
    const secondsText = this.props.mark.timeHMS[2].toString().padStart(2,'0');
    if (this.props.mark.timeHMS[0] === 0) {
      time = minutesText+':'+secondsText;
    } else {
      time = hoursText+':'+minutesText+':'+secondsText;
    }


    return(
      <Grid container direction="column" style={{padding: '10px'}}>


        <Grid item>
          <Grid container alignItems="center">
            <Grid item style={{paddingRight: '10px'}}>
              <Paper style={{padding: '4px', backgroundColor: 'orange'}}>
                <Typography style={{fontSize: '12px', color: 'white'}} >{this.props.mark.type}</Typography>
              </Paper>
            </Grid>

            <Grid item style={{paddingRight: '10px'}}>
              <Typography variant="h6" style={{fontWeight: 'bold'}}>{this.props.mark.title}</Typography>
            </Grid>

            <Grid item xs>
              <Box display="flex" flexDirection="row-reverse">
                <Box style={{paddingTop: '10px', paddingLeft: '10px'}}>
                  <Button onClick={this.handleEdit} variant="contained" color="primary" >Editar</Button>
                </Box>
                <Box style={{paddingTop: '10px', paddingLeft: '10px'}}>
                  <Button onClick={this.handleDelete} variant="contained" color="primary"><Delete /></Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>


        <Grid item>
          <Typography variant="h7" >{time}</Typography>
        </Grid>


        <Grid item >
        {
          this.state.editing
          ? <MarkInfoEditing dispatch={this.props.dispatch} mark={this.props.mark} index={this.props.index} />
          : null
        }
        </Grid>


      </Grid>
    )
  }

}
