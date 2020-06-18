import React from 'react';

import {Grid, Typography, Button, TextField, Switch} from '@material-ui/core';
import {Delete} from '@material-ui/icons/';


export default class AnswersForm extends React.Component {

    handleAnswer = (answer) => {
      this.props.answerSave(this.props.index, answer.target.value);
    }

    handleCorrectAnswer = (answer) => {
      if (this.props.correctAnswer) {
        this.props.correctAnswersSave(this.props.index, false);
      } else {
        this.props.correctAnswersSave(this.props.index, true);
      }
    }

    handleDelete = (event) => {
      this.props.deleteAnswerSave(this.props.index);
    }



  render() {

    const nAnswer = "Respuesta " + (this.props.index+1).toString();

    return(
      <Grid container alignItems="center">

          <Grid item xs style={{paddingRight: '15px'}}>
            <TextField fullWidth value={this.props.answer} onChange={this.handleAnswer} label={nAnswer} variant="outlined" multiline rows={2}></TextField>
          </Grid>


          <Grid item style={{paddingRight: '15px'}}>
            {
              this.props.index > 1
              ? <Button onClick={this.handleDelete} variant="contained" color="primary"><Delete /></Button>
              : null
            }
          </Grid>


          <Grid item style={{paddingRight: '15px'}}>
            <Grid container alignItems="center">
              <Grid item>
                {
                  this.props.correctAnswer
                  ? <Typography variant="h7">Falso</Typography>
                  : <Typography variant="h7" style={{fontWeight: 'bold'}}>Falso</Typography>
                }
              </Grid>
              <Grid item>
                <Switch checked={this.props.correctAnswer} onChange={this.handleCorrectAnswer} />
              </Grid>
              <Grid item>
              {
                this.props.correctAnswer
                ? <Typography variant="h7" style={{fontWeight: 'bold'}}>Verdadero</Typography>
                : <Typography variant="h7">Verdadero</Typography>
              }
              </Grid>
            </Grid>
          </Grid>


      </Grid>
    )
  }

}
