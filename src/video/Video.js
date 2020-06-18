import React from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';

import VideoBar from './VideoBar';
import PopMark from './PopMark';

import VideoCSS from '../Video.css';

var timerMarks;
var timerSeconds;

export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 0,
      playerReady: false,
      previousStop: 0,
      marksId: [],
      volume: 80,
      insideMark: false,
      returning: false,
      playing: false
    }

}

componentDidMount = () => {

  if (!window.YT) {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = (e) => {
      this.loadVideo();
    };

  } else {
    this.loadVideo();
  }

}

loadVideo = () => {
  this.player = new window['YT'].Player('player', {
    videoId: this.props.url,
    height: "100%",
    width: "100%",
    playerVars: {'controls': 0, 'disablekb': 1, 'modestbranding': 1, 'rel': 0, 'showinfo': 0, 'playsinline': 1},
    events: {
      'onStateChange': this.onPlayerStateChange,
      'onReady': this.onPlayerReady

    }
  });
}

//////////////////////////////////////////////////////


componentWillUnmount() {
  clearInterval(timerMarks);
  clearInterval(timerSeconds);
}




  stopSave = () => {
    this.player.pauseVideo();
  }

  playSave = () => {
    this.player.playVideo();
  }

  timerStart = () => {

    timerSeconds = setInterval(() => {
      let current = this.player.getCurrentTime();
      let currentInt = Math.floor(current);
      this.props.handleTimeVideo(currentInt);
    }, 200);

    timerMarks = setInterval(() => {
      let second = this.player.getCurrentTime();
      this.searchMarks(second);
    }, 500);

  }

  timerStop = () =>{
    clearInterval(timerMarks);
    clearInterval(timerSeconds);
    let current = this.player.getCurrentTime();
    let currentInt = Math.floor(current);
    this.props.handleTimeVideo(currentInt);
  }

  onPlayerStateChange = (event) => {
    if(event.data === 1){
      this.timerStart();
      this.setState({marksId: [], insideMark: false, playing: true});
    } else {
      this.timerStop();
      this.setState({playing: false});
    }
  }

  onPlayerReady = (event) => {
    this.setState({duration: this.player.getDuration() -1, playerReady: true});
    this.player.setVolume(80);
  }

  convertTime = (second) => {
    const hours = Math.floor(second / 3600);
    const minutes = Math.floor((second - hours*3600) / 60);
    const seconds = Math.floor(second - (hours*3600 + minutes*60));
    const hoursText = hours.toString().padStart(2,'0');
    const minutesText = minutes.toString().padStart(2,'0');
    const secondsText = seconds.toString().padStart(2,'0');
    if (hours === 0) {
      const time = minutesText+':'+secondsText;
      this.setState({currentTime: time});
    } else {
      const time = hoursText+':'+minutesText+':'+secondsText;
      this.setState({currentTime: time});
    }
  }

  volumeSave = (volume) => {
    this.player.setVolume(volume);
    this.setState({volume: volume});
  }

  seekSecond = (second) => {
    this.props.handleTimeVideo(second);
    this.setState({returning: true});
    this.player.seekTo(second);
    this.playSave();
  }

  rangeSave = (second) => {
    if (second < this.props.currentSecond) {
      this.setState({returning: true});
    }
    this.props.handleTimeVideo(second);
    this.player.seekTo(second);
  }

  rangeMarkSave = (second) => {
    this.stopSave();
    this.player.seekTo(second);
    this.setState({insideMark: true});
    this.props.handleTimeVideo(second);
    this.searchMarks(second);
  }


  searchMarks = (second) => {
    let current = second;
    let currentInt = Math.floor(current);

    var marksId = [];

    for (const [index, mark] of this.props.marks.entries()) {
      if (mark.time === currentInt) {
        marksId.push(index);
      }
    }

    if (marksId.length !== 0) {

      if (this.state.returning === false) {
        if (currentInt === Math.floor(this.state.previousStop) && current > this.state.previousStop) {
          this.setState({returning: false});
        } else {
          this.stopSave()
          this.setState({previousStop: current, marksId: marksId, insideMark: true, returning: false});
        }
      } else {
        this.stopSave()
        this.setState({previousStop: current, marksId: marksId, insideMark: true, returning: false});
      }

    }
  }



  render() {

    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={12} >
            <div className="video-responsive" >
              <div id="player"></div>
            </div>
          </Grid>


          <Grid item xs={12} >
            <VideoBar
              marks={this.props.marks}
              seekSecond={this.seekSecond}
              playing={this.state.playing}
              playerReady={this.state.playerReady}
              duration={this.state.duration}
              currentSecond={this.props.currentSecond}
              currentTime={this.props.currentTime}
              playSave={this.playSave}
              stopSave={this.stopSave}
              rangeSave={this.rangeSave}
              rangeMarkSave={this.rangeMarkSave}
              insideMark={this.state.insideMark}
              volume={this.state.volume}
              volumeSave={this.volumeSave}
            />
          </Grid>


        </Grid>
      </div>
    );
  }


}
