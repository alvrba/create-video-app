import React from 'react';
import {connect} from 'react-redux';

import {Grid, Paper, Button} from '@material-ui/core';

import Data from './Data';
import MarkInfo from './MarkInfo';
import VideoGeneral from './VideoGeneral';
import VideoShow from './VideoShow';
import TopBar from './TopBar';

import indigo from '@material-ui/core/colors/indigo';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
    }
  }


  handleFollowing = (event) => {
    if (this.props.title.length !== 0 && this.props.url.length !== 0){
      this.setState({status: 1})
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  }

  handleBack = (event) => {
    this.setState({status: 0})
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  handlePublish = (event) => {
    const data = {
      title: this.props.title,
      description: this.props.description,
      url: this.props.url,
      marks: this.props.marks
    }

    if (window.videoId) {
      fetch('/videos/'+window.videoId, {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)} )
      .then((res) => {
        if (res.ok) {
          window.location = res.url;
        } else {
          console.log("Error")
        }
      })
    } else {
      fetch('/videos', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)} )
      .then((res) => {
        if (res.redirected) {
          window.location = res.url;
        } else {
          console.log("Error")
        }
      })
    }



  }




  render() {

    const requiredContinue = this.props.title.length !== 0 && this.props.url.length !== 0;

    if (this.state.status === 1) {
      return(
        <Grid container style={{paddingBottom: '100px'}}>
          <Grid item xs={12}>
            <MarkInfo dispatch={this.props.dispatch} url={this.props.url} marks={this.props.marks} title={this.props.title} description={this.props.description}/>
          </Grid>

          <div style={{position: 'fixed', bottom: '0', width: '100%'}} >
            <Grid container xs={12} justify="flex-end" style={{backgroundColor: 'rgb(232,234,246,0.8)'}}>
              <Grid item style={{marginTop: '10px', marginBottom: '10px', marginRight: '10px'}}>
                <Button onClick={this.handleBack} variant="contained" color="primary" size="large">Atrás</Button>
              </Grid>
              <Grid item style={{marginTop: '10px', marginBottom: '10px', marginRight: '10px'}}>
                {
                  requiredContinue
                  ? <Button onClick={this.handlePublish} variant="contained" color="primary" size="large">Publicar video</Button>
                  : <Button disabled onClick={this.handlePublish} variant="contained" color="primary" size="large">Publicar video</Button>
                }
              </Grid>
            </Grid>
          </div>

        </Grid>

      )
    } else {
      return(
        <Grid container style={{paddingBottom: '100px'}}>



          <Grid item xs={12} style={{backgroundColor: indigo[100], padding: '10px', marginBottom: '15px'}}>
            <TopBar title={this.props.title} />
          </Grid>



          <Grid item xs={12} lg={6} style={{padding: '20px'}}>
            <Paper>
              <VideoShow dispatch={this.props.dispatch} url={this.props.url} title={this.props.title} description={this.props.description}/>
            </Paper>

            <VideoGeneral dispatch={this.props.dispatch} url={this.props.url} />

          </Grid>



          <Grid item xs={12} lg={6} style={{padding: '20px'}}>

            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Data dispatch={this.props.dispatch} title={this.props.title} description={this.props.description} />
              </Grid>
            </Grid>

          </Grid>

          <div style={{position: 'fixed', bottom: '0', width: '100%'}} >
            <Grid container xs={12} justify="flex-end" style={{backgroundColor: 'rgb(232,234,246,0.8)'}}>
              <Grid item style={{marginTop: '10px', marginBottom: '10px', marginRight: '10px'}}>
                {
                  requiredContinue
                  ? <Button onClick={this.handleFollowing} variant="contained" color="primary" size="large" >Siguiente</Button>
                  : <Button disabled onClick={this.handleFollowing} variant="contained" color="primary" size="large" >Siguiente</Button>
                }
              </Grid>
            </Grid>
          </div>



        </Grid>
      )
    }

  }

}

function mapStateToProps(state) {
  return {
    ...state
  };
}

export default connect(mapStateToProps)(App);
