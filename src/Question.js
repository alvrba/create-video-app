import React from 'react';
import Blocks from './Blocks';
import AnswersForm from './AnswersForm';

import {Grid, Typography, Button, TextField, FormControlLabel, Switch} from '@material-ui/core';


export default class Question extends React.Component {

    handleQuestion = (question) => {
      this.props.questionSave(question.target.value);
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

    handleNumberAnswers = (event) => {
      if (this.props.content.numberAnswers < 7) {
        let newAnswers = this.props.content.answers;
        newAnswers.push("");
        let newCorrectAnswers = this.props.content.correctAnswers;
        newCorrectAnswers.push(false);
        const newNumberAnswers = newAnswers.length;

        this.props.numberAnswersSave(newNumberAnswers, newAnswers, newCorrectAnswers);
      }
    }

    deleteAnswerSave = (index) => {
      let newAnswers = this.props.content.answers;
      newAnswers.splice(index, 1);
      let newCorrectAnswers = this.props.content.correctAnswers;
      newCorrectAnswers.splice(index, 1);
      const newNumberAnswers = newAnswers.length;

      this.props.numberAnswersSave(newNumberAnswers, newAnswers, newCorrectAnswers);
    }

    answerSave = (index, answer) => {
      let newAnswers = this.props.content.answers;

      newAnswers[index] = answer;

      this.props.answersSave(newAnswers);
    }

    correctAnswersSave = (index, correctAnswer) => {
      let newCorrectAnswers = this.props.content.correctAnswers;
      newCorrectAnswers[index] = correctAnswer;

      this.props.correctAnswersSave(newCorrectAnswers);
    }



  render() {

    return(
      <Grid container direction="column" justify="flex-start">
        <Grid item style={{paddingBottom: '15px'}}>
          <Typography variant="h6" style={{fontWeight: 'bold'}}>Pregunta múltiple</Typography>
        </Grid>
        <Grid item style={{paddingBottom: '30px'}}>
          <TextField fullWidth value={this.props.content.question} onChange={this.handleQuestion} label="Pregunta" variant="outlined" multiline rows={2}></TextField>
        </Grid>


        { [...Array(this.props.content.numberAnswers).keys()].map((item, index) => {
          return <Grid item style={{paddingBottom: '15px'}}><AnswersForm key={index} index={index} answer={this.props.content.answers[index]} correctAnswer={this.props.content.correctAnswers[index]} answerSave={this.answerSave} correctAnswersSave={this.correctAnswersSave} deleteAnswerSave={this.deleteAnswerSave} /></Grid>
        })
        }



        <Grid item>
        {
          this.props.content.numberAnswers < 7
          ? <Button onClick={this.handleNumberAnswers} variant="contained" color="primary">Añadir nueva respuesta</Button>
          : <Button disabled onClick={this.handleNumberAnswers} variant="contained" color="primary">Añadir nueva respuesta</Button>
        }
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
