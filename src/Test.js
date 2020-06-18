import React from 'react';
import Blocks from './Blocks';

import {Grid, Typography, TextField, FormControlLabel, Switch} from '@material-ui/core';


export default class Test extends React.Component {

    handleQuestion = (question) => {
      this.props.questionSave(question.target.value);
    }

    handleAnswer = (event) => {
      let newAnswer = this.props.content.answer;
      newAnswer ? this.props.answerSave(false) : this.props.answerSave(true);
    }

    handleReason = (reason) => {
      this.props.reasonSave(reason.target.value);
    }

    blocksSave = (returnTime) => {
      this.props.returnTimeSave(returnTime);
    }

    handleBlocks = () => {
      const newBlocks = !this.props.content.blocks;
      this.props.blocksSave(newBlocks);
    }



  render() {


    if (this.props.answer) {

    } else {

    }

    return(
      <Grid container direction="column" justify="flex-start">
        <Grid item style={{paddingBottom: '15px'}}>
          <Typography variant="h6" style={{fontWeight: 'bold'}}>Test</Typography>
        </Grid>
        <Grid item style={{paddingBottom: '15px'}}>
          <TextField fullWidth value={this.props.content.question} onChange={this.handleQuestion} label="Pregunta" variant="outlined" multiline rows={2}></TextField>
        </Grid>

        <Grid item>

        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            {
              this.props.content.answer
              ? <Typography variant="h7">Falso</Typography>
              : <Typography variant="h7" style={{fontWeight: 'bold'}}>Falso</Typography>
            }
          </Grid>
          <Grid item>
            <Switch checked={this.props.content.answer} onChange={this.handleAnswer} name="answer" />
          </Grid>
          <Grid item>
          {
            this.props.content.answer
            ? <Typography variant="h7" style={{fontWeight: 'bold'}}>Verdadero</Typography>
            : <Typography variant="h7">Verdadero</Typography>
          }
          </Grid>
        </Grid>
      </Grid>

        <Grid item style={{paddingBottom: '15px', paddingTop: '30px'}}>
          <FormControlLabel
            control={<Switch checked={this.props.content.blocks} onChange={this.handleBlocks} name="blocks" />}
            label="Bloquear marca"
          />
          {
            this.props.content.blocks
            ? <Blocks
                blocksSave={this.blocksSave}
                returnTimeHMS={this.props.content.returnTimeHMS}
                hoursReturnSave={this.props.hoursReturnSave}
                minutesReturnSave={this.props.minutesReturnSave}
                secondsReturnSave={this.props.secondsReturnSave}
              />
            : null
          }
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
