import React from 'react';
import MarkEditor from './MarkEditor';

import {Grid, Typography, Box, Button, TextField, AppBar, Tabs, Tab} from '@material-ui/core';
import { QuestionAnswer, Help, Info, Web } from '@material-ui/icons';


import {editMark} from './redux/actions';


export default class MarkInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        ...this.props.mark, oldProps: this.props
    };


  }


  static getDerivedStateFromProps(props, state) {
    if (props.mark !== state.oldProps.mark) {
      return {...props.mark, oldProps: props};
    }
    return null;
  }



    handleTitle = (title) => {
      this.setState({title: title.target.value});
    }


    // ADMINISTRAR TIEMPO GENERAL MARCA
    handleTimeVideo = (time) => {
      this.setState({time: time});
      this.convertTime(time);
    }

    convertTime = (second) => {
      const hours = Math.floor(second / 3600);
      const minutes = Math.floor((second - hours*3600) / 60);
      const seconds = Math.floor(second - (hours*3600 + minutes*60));

      const timeHMS = [hours, minutes, seconds];
      this.setState({timeHMS: timeHMS});
    }

    handleHours = (hours) => {
      let newTimeHMS = this.state.timeHMS;
      const hoursInt = parseInt(hours.target.value);
      if (!isNaN(hoursInt)){
        newTimeHMS[0] = hoursInt;
        this.setState({timeHMS: newTimeHMS});
        this.convertTimeBackwards(newTimeHMS);
      }
    }

    handleMinutes = (minutes) => {
      let newTimeHMS = this.state.timeHMS;
      let minutesInt = parseInt(minutes.target.value);
      if (!isNaN(minutesInt)){
        if (minutesInt > 59) {
          minutesInt = 59;
        }
        newTimeHMS[1] = minutesInt;
        this.setState({timeHMS: newTimeHMS});
        this.convertTimeBackwards(newTimeHMS);
      }
    }

    handleSeconds = (seconds) => {
      let newTimeHMS = this.state.timeHMS;
      let secondsInt = parseInt(seconds.target.value);
      if (!isNaN(secondsInt)){
        if (secondsInt > 59) {
          secondsInt = 59;
        }
        newTimeHMS[2] = secondsInt;
        this.setState({timeHMS: newTimeHMS});
        this.convertTimeBackwards(newTimeHMS);
      }
    }

    convertTimeBackwards = (newTimeHMS) => {
      const time = newTimeHMS[0]*3600 + newTimeHMS[1]*60 + newTimeHMS[2];
      this.setState({time: time});
    }

    //ADMINISTRAR TIEMPO RETURN MARCA
    hoursReturnSave = (hours) => {
      let newTimeReturnHMS = this.state.content.returnTimeHMS;
      const hoursInt = parseInt(hours);
      if (!isNaN(hoursInt)){
        newTimeReturnHMS[0] = hoursInt;
        this.setState(prevState => ({ content: {...prevState.content, returnTimeHMS: newTimeReturnHMS}}));
        this.convertTimeBackwardsReturn(newTimeReturnHMS);
      }
    }

    minutesReturnSave = (minutes) => {
      let newTimeReturnHMS = this.state.content.returnTimeHMS;
      let minutesInt = parseInt(minutes);
      if (!isNaN(minutesInt)){
        if (minutesInt > 59) {
          minutesInt = 59;
        }
        newTimeReturnHMS[1] = minutesInt;
        this.setState(prevState => ({ content: {...prevState.content, returnTimeHMS: newTimeReturnHMS}}));
        this.convertTimeBackwardsReturn(newTimeReturnHMS);
      }
    }

    secondsReturnSave = (seconds) => {
      let newTimeReturnHMS = this.state.content.returnTimeHMS;
      let secondsInt = parseInt(seconds);
      if (!isNaN(secondsInt)){
        if (secondsInt > 59) {
          secondsInt = 59;
        }
        newTimeReturnHMS[2] = secondsInt;
        this.setState(prevState => ({ content: {...prevState.content, returnTimeHMS: newTimeReturnHMS}}));
        this.convertTimeBackwardsReturn(newTimeReturnHMS);
      }
    }

    convertTimeBackwardsReturn = (newTimeReturnHMS) => {
      const returnTime = newTimeReturnHMS[0]*3600 + newTimeReturnHMS[1]*60 + newTimeReturnHMS[2];
      this.setState(prevState => ({ content: {...prevState.content, returnTime: returnTime}}));
    }


    handleSubmit = (event) => {
      let mark = JSON.parse(JSON.stringify(this.state));
      delete mark.oldProps;
      if (this.state.title.length !== 0 && this.state.time.length !== 0) {
        if (this.state.type === 'TEST' || this.state.type === 'QUESTION') {
          if (this.state.content.question.length !== 0) {
            this.props.dispatch(editMark(mark, this.props.index));
          } else {
            return null;
          }
        } else if (this.state.type === 'INFO') {
          if (this.state.content.description.length !== 0) {
            this.props.dispatch(editMark(mark, this.props.index));
          } else {
            return null;
          }
        } else if (this.state.type === 'WEB') {
          if (this.state.content.description.length !== 0 && this.state.content.url.length !== 0) {
            this.props.dispatch(editMark(mark, this.props.index));
          } else {
            return null;
          }
        }
      } else {
        return null
      }

    }


    loadInitialState = (nMarksCurrent) => {
      const nMarks = "Marca " + (nMarksCurrent+2).toString();
      this.setState({
          title: nMarks,
          time: 0,
          timeHMS: [0,0,0],
          type: "QUESTION",
          content: {
            question: "",
            numberAnswers: 2,
            answers: ["",""],
            correctAnswers: [false, false],
            reason: "",
            blocks: false,
            returnTime: 0,
            returnTimeHMS: [0,0,0],
            returned: false,
            correct: false,
            completed: false
          }
      });
    }

    handleChangeType = (event, newValue) => {
      if (newValue === "QUESTION") {
        this.handleTypeQuestion();
      } else if (newValue === "TEST") {
        this.handleTypeTest();
      } else if (newValue === "WEB") {
        this.handleTypeWeb();
      } else if (newValue === "INFO") {
        this.handleTypeInfo();
      }
    }

    handleTypeQuestion = () => {
      if (this.state.type !== "QUESTION") {
        this.setState({
          type: "QUESTION",
          content: {
            question: "",
            numberAnswers: 2,
            answers: ["",""],
            correctAnswers: [false, false],
            reason: "",
            blocks: false,
            returnTime: 0,
            returnTimeHMS: [0,0,0],
            returned: false,
            correct: false,
            completed: false
          }
        });
      }
    }

    handleTypeTest = () => {
      if (this.state.type !== "TEST") {
        this.setState({
          type: "TEST",
          content: {
            question: "",
            answer: false,
            reason: "",
            blocks: false,
            returnTime: 0,
            returnTimeHMS: [0,0,0],
            returned: false,
            correct: -1,
            completed: false
          }
        });
      }
    }

    handleTypeWeb = () => {
      if (this.state.type !== "WEB") {
        this.setState({
          type: "WEB",
          content: {
            url: "https://www.wikipedia.org/",
            description: "",
            reason: "",
            blocks: false,
            returnTime: 0,
            returnTimeHMS: [0,0,0],
            returned: true,
            correct: true,
            completed: true
          }
        });
      }
    }

    handleTypeInfo = () => {
      if (this.state.type !== "INFO") {
        this.setState({
          type: "INFO",
          content: {
            description: "",
            reason: "",
            blocks: false,
            returnTime: 0,
            returnTimeHMS: [0,0,0],
            returned: true,
            correct: true,
            completed: true
          }
        });
      }
    }

    // FUNCIONES CAMBIO ESTADOS ///////////////////////////////// /////
    questionSave = (question) => {
      this.setState(prevState => ({ content: {...prevState.content, question: question}}));
    }

    reasonSave = (reason) => {
      this.setState(prevState => ({ content: {...prevState.content, reason: reason}}));
    }

    blocksSave = (blocks) => {
      this.setState(prevState => ({ content: {...prevState.content, blocks: blocks}}));
    }

    numberAnswersSave = (numberAnswers, answers, correctAnswers) => {
      this.setState(prevState => ({ content: {...prevState.content, numberAnswers: numberAnswers, answers: answers, correctAnswers: correctAnswers}}));
    }

    answersSave = (answers) => {
      this.setState(prevState => ({ content: {...prevState.content, answers: answers}}));
    }

    correctAnswersSave = (correctAnswers) => {
      this.setState(prevState => ({ content: {...prevState.content, correctAnswers: correctAnswers}}));
    }

    answerSave = (answer) => {
      this.setState(prevState => ({ content: {...prevState.content, answer: answer}}));
    }

    descriptionSave = (description) => {
      this.setState(prevState => ({ content: {...prevState.content, description: description}}));
    }

    urlSave = (url) => {
      this.setState(prevState => ({ content: {...prevState.content, url: url}}));
    }



  render() {
    const submitButton = <Button onClick={this.handleSubmit} variant="contained" color="primary" size="large">Guardar marca</Button>
    const submitButtonDisabled = <Button disabled onClick={this.handleSubmit} variant="contained" color="primary" size="large">Guardar marca</Button>

    const renderSubmitButton = () => {
      if (this.state.title.length !== 0 && this.state.time.length !== 0) {
        if (this.state.type === 'TEST' || this.state.type === 'QUESTION') {
          return this.state.content.question.length !== 0 ? submitButton : submitButtonDisabled
        } else if (this.state.type === 'INFO') {
          return this.state.content.description.length !== 0 ? submitButton : submitButtonDisabled
        } else if (this.state.type === 'WEB') {
          return (this.state.content.description.length !== 0 && this.state.content.url.length !== 0) ? submitButton : submitButtonDisabled
        }
      } else {
        return submitButtonDisabled
      }
    }


    return(

      <Grid container >

        <Grid item xs={12} style={{padding: '20px'}}>
          <Grid container direction="column" style={{paddingBottom: '15px'}}>
            <Grid item style={{paddingBottom: '25px'}}>
              <Typography variant="h5">Editar marca</Typography>
            </Grid>
            <Grid item style={{paddingBottom: '25px'}}>
              <TextField fullWidth value={this.state.title} onChange={this.handleTitle} label="Nombre marca" variant="outlined" ></TextField>
            </Grid>
            <Grid item style={{paddingBottom: '25px'}}>
              <Grid container justify="flex-start" spacing={2}>
                <Grid item style={{paddingRight: '20px'}}>
                  <TextField value={this.state.timeHMS[0]} onChange={this.handleHours} label="Horas" variant="outlined" inputProps={{maxLength: 2}}></TextField>
                </Grid>
                <Grid item style={{paddingRight: '20px'}}>
                  <TextField value={this.state.timeHMS[1]} onChange={this.handleMinutes} label="Minutos" variant="outlined" inputProps={{maxLength: 2}}></TextField>
                </Grid>
                <Grid item>
                  <TextField value={this.state.timeHMS[2]} onChange={this.handleSeconds} label="Segundos" variant="outlined" inputProps={{maxLength: 2}}></TextField>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <AppBar position="static" color="default">
            <Tabs
              value={this.state.type}
              onChange={this.handleChangeType}
              variant="scrollable"
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
              aria-label="scrollable force tabs example"
            >
              <Tab label="QUESTION" value={"QUESTION"} icon={<QuestionAnswer />} />
              <Tab label="TEST" value={"TEST"} icon={<Help />}/>
              <Tab label="WEB" value={"WEB"} icon={<Web />} />
              <Tab label="INFO" value={"INFO"} icon={<Info />} />
            </Tabs>
          </AppBar>


          <Grid item  style={{paddingTop: '20px', paddingBottom: '20px'}}>
            <MarkEditor
              type={this.state.type}
              content={this.state.content}
              questionSave={this.questionSave}
              reasonSave={this.reasonSave}
              blocksSave={this.blocksSave}
              numberAnswersSave={this.numberAnswersSave}
              answersSave={this.answersSave}
              correctAnswersSave={this.correctAnswersSave}
              answerSave={this.answerSave}
              descriptionSave={this.descriptionSave}
              urlSave={this.urlSave}
              hoursReturnSave={this.hoursReturnSave}
              minutesReturnSave={this.minutesReturnSave}
              secondsReturnSave={this.secondsReturnSave}
            />
          </Grid>

          <Box display="flex" flexDirection="row-reverse">
            {renderSubmitButton()}
          </Box>

        </Grid>



      </Grid>
    )
  }

}
