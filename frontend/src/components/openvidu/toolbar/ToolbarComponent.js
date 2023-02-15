import React, { Component } from "react";
import "./ToolbarComponent.css";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
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
// import http from "api/Http";

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
    this.storeResult = this.storeResult.bind(this);
  }

  storeResult() {
    this.props.storeResult();
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

  render() {
    const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    // const positionId = this.props.positionId;
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
            {localUser !== undefined && localUser.isAudioActive() ? (
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => {
                  this.micStatusChanged();
                  this.handleMicState();
                }}
                startIcon={<StopIcon />}
              >
                발언 종료
              </Button>
            ) : (
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => {
                  this.micStatusChanged();
                  this.handleMicState();
                }}
                startIcon={<PlayArrowIcon />}
              >
                발언 시작
              </Button>
            )}
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

            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                Swal.fire({
                  title: "인터뷰를 종료하시겠습니까?",
                  showDenyButton: true,
                  confirmButtonText: "예",
                  denyButtonText: "아니오",
                  icon: "question",
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    await this.storeResult();
                    this.leaveSession();
                  } else if (result.isDenied) {
                    Swal.fire("네", "", "info");
                  }
                });
              }}
              startIcon={<PowerSettingsNew />}
            >
              인터뷰 종료
            </Button>

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
