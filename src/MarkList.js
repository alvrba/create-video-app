import React from 'react';
import MarkItem from './MarkItem';
import {Grid, Paper} from '@material-ui/core';


export default class MarkList extends React.Component {

  render() {
    return(
      <div>
        {
          this.props.marks.map((mark, index) => {
              return <Grid item key={index} style={{width: '100%', paddingTop: '20px'}}><Paper><MarkItem key={index} index={index} dispatch={this.props.dispatch} mark={this.props.marks[index]} /></Paper></Grid>
          })
        }
      </div>
    )
  }

}
