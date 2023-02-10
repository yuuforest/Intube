import React, { Component } from "react";
import "./ToolbarComponent.css";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Mic from "@mui/icons-material/Mic";
import MicOff from "@mui/icons-material/MicOff";
import Videocam from "@mui/icons-material/Videocam";
import VideocamOff from "@mui/icons-material/VideocamOff";
import Fullscreen from "@mui/icons-material/Fullscreen";
import FullscreenExit from "@mui/icons-material/FullscreenExit";
import PictureInPicture from "@mui/icons-material/PictureInPicture";
import ScreenShare from "@mui/icons-material/ScreenShare";
import StopScreenShare from "@mui/icons-material/StopScreenShare";
import Tooltip from "@mui/material/Tooltip";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import QuestionAnswer from "@mui/icons-material/QuestionAnswer";
import IconButton from "@mui/material/IconButton";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import http from "api/Http";


// import { connect } from 'react-redux';
// import * as actions from 'redux/actions/stateChange';

const logo = require("assets/logo2.png");

export default class ToolbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { fullscreen: false, record: "primary" };
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.handleMicState = this.handleMicState.bind(this);
    this.storeResult = this.storeResult.bind(this);
  }

  handleMicState() {
    this.props.handleMicState();
  }

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }

  screenShare() {
    this.props.screenShare();
  }

  stopScreenShare() {
    this.props.stopScreenShare();
  }

  toggleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen });
    this.props.toggleFullscreen();
  }

  switchCamera() {
    this.props.switchCamera();
    if (this.state.record === "primary") this.setState({ record: "warning" });
    else this.setState({ record: "primary" });
  }

  leaveSession() {
    this.props.leaveSession();
  }

  toggleChat() {
    this.props.toggleChat();
  }

  storeResult(positionId) {
    if (positionId === 1) {
      http
      .post("/conference/end?historyID=" + localStorage.getItem('historyID') + 
      '&conferenceID=' +  this.props.conferenceID + '&interviewTimeID=' + this.props.interviewTimeID,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        localStorage.removeItem('historyID')
        http
          .post("/result/create?interview_id=" + this.props.interviewId + '&interview_time_id=' + this.props.interviewTimeID,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
          .then(() => {
            console.log('필립까지 완료')
          })
          .catch((error) => {
            console.error(error)
          })
          )
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      http
      .post("/conference/end?historyID=" + localStorage.getItem('historyID') + 
      '&conferenceID=' +  this.props.conferenceID + '&interviewTimeID=' + this.props.interviewTimeID,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        localStorage.removeItem('historyID')
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  render() {
    const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    const positionId = this.props.positionId;
    // const { storeMic, changeStoreState } = this.props
    return (
      <AppBar className="toolbar" id="header">
        <Toolbar className="toolbar">
          <div id="navSessionInfo">
            <img id="header_img" alt="OpenVidu Logo" src={logo} width="130px" />

            {this.props.sessionId && (
              <div id="titleContent">
                <span id="session-title">{mySessionId}</span>
              </div>
            )}
          </div>

          <div className="buttonsContent">
            <IconButton
              color="inherit"
              className="navButton"
              id="navMicButton"
              onClick={() => {
                this.micStatusChanged();
                this.handleMicState();
              }}
            >
              {localUser !== undefined && localUser.isAudioActive() ? (
                <Mic />
              ) : (
                <MicOff color="secondary" />
              )}
            </IconButton>

            <IconButton
              color="inherit"
              className="navButton"
              id="navCamButton"
              onClick={this.camStatusChanged}
            >
              {localUser !== undefined && localUser.isVideoActive() ? (
                <Videocam />
              ) : (
                <VideocamOff color="secondary" />
              )}
            </IconButton>

            <IconButton
              color="inherit"
              className="navButton"
              onClick={this.screenShare}
            >
              {localUser !== undefined && localUser.isScreenShareActive() ? (
                <PictureInPicture />
              ) : (
                <ScreenShare />
              )}
            </IconButton>

            {localUser !== undefined && localUser.isScreenShareActive() && (
              <IconButton onClick={this.stopScreenShare} id="navScreenButton">
                <StopScreenShare color="secondary" />
              </IconButton>
            )}

            <IconButton
              color={this.state.record}
              className="navButton"
              onClick={this.switchCamera}
            >
              <FiberManualRecordIcon />
            </IconButton>
            <IconButton
              color="inherit"
              className="navButton"
              onClick={this.toggleFullscreen}
            >
              {localUser !== undefined && this.state.fullscreen ? (
                <FullscreenExit />
              ) : (
                <Fullscreen />
              )}
            </IconButton>
            <IconButton
              color="secondary"
              className="navButton"
              onClick={() => {this.leaveSession(); this.storeResult(positionId);}}
              id="navLeaveButton"
            >
              <PowerSettingsNew />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={this.toggleChat}
              id="navChatButton"
            >
              {this.props.showNotification && <div id="point" className="" />}
              <Tooltip title="Chat">
                <QuestionAnswer />
              </Tooltip>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

// const mapStateToProps = (state) => ({
//   storeMic: state
// });

// const mapDispatchToProps = (dispatch) => ({
//   changeStoreState: () => dispatch(actions.changeState()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ToolbarComponent);
