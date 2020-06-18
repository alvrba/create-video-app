import React from 'react';
import Question from './Question';
import Test from './Test';
import Web from './Web';
import Info from './Info';


export default class MarkEditor extends React.Component {



  render() {
    if (this.props.type === "QUESTION") {
      return(
        <div>
          <Question
            content={this.props.content}
            questionSave={this.props.questionSave}
            reasonSave={this.props.reasonSave}
            blocksSave={this.props.blocksSave}
            numberAnswersSave={this.props.numberAnswersSave}
            correctAnswersSave={this.props.correctAnswersSave}
            answersSave={this.props.answersSave}
            hoursReturnSave={this.props.hoursReturnSave}
            minutesReturnSave={this.props.minutesReturnSave}
            secondsReturnSave={this.props.secondsReturnSave}
          />
        </div>
      )
    } else if (this.props.type === "TEST") {
      return(
        <div>
          <Test
            content={this.props.content}
            questionSave={this.props.questionSave}
            reasonSave={this.props.reasonSave}
            blocksSave={this.props.blocksSave}
            answerSave={this.props.answerSave}
            hoursReturnSave={this.props.hoursReturnSave}
            minutesReturnSave={this.props.minutesReturnSave}
            secondsReturnSave={this.props.secondsReturnSave}
          />
        </div>
      )
    } else if (this.props.type === "WEB" ){
      return(
        <div>
          <Web
            content={this.props.content}
            reasonSave={this.props.reasonSave}
            descriptionSave={this.props.descriptionSave}
            urlSave={this.props.urlSave}
          />
        </div>
      )
    } else if (this.props.type === "INFO") {
      return(
        <div>
          <Info
            content={this.props.content}
            reasonSave={this.props.reasonSave}
            descriptionSave={this.props.descriptionSave}
          />
        </div>
      )
    }
  }

}
