// import React from "react";
// import OpenViduLayout from "./layout/openvidu-layout";

// export default function VideoRoomComponents(props) {
//   const [hasBeenUpdated, setHasBeenUpdated] = React.useState(false);
//   const [layout, setLayout] = React.useState(new OpenViduLayout());
//   const [remotes, setRemotes] = React.useState([]);
//   const [localUserAccessAllowed, setLocalUserAccessAllowed] =
//     React.useState(false);
//   let sessionName = "SessionA";
//   let userName = "OpenVidu_User" + Math.floor(Math.random() * 100);
//   return <div>VideoRoomComponents</div>;
// }
import QuestionLIst from "components/conference/QuestionLIst";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import http from "api/Http";
import { OpenVidu } from "openvidu-browser";
import React, { Component } from "react";
import ChatComponent from "./chat/ChatComponent";
import DialogExtensionComponent from "./dialog-extension/DialogExtension";
import StreamComponent from "./stream/StreamComponent";
import "./VideoRoomComponent.css";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import OpenViduLayout from "./layout/openvidu-layout";
import UserModel from "./models/user-model";
import ToolbarComponent from "./toolbar/ToolbarComponent";
import NowQuestion from "components/conference/NowQuestion";
import NowAnswer from "components/conference/NowAnswer";
import Logo from "assets/avatajang.png";
import { Divider } from "@mui/material";
var localUser = new UserModel();
const APPLICATION_SERVER_URL = "https://intube.store:443/api/";

class VideoRoomComponent extends Component {
  constructor(props) {
    super(props);
    this.hasBeenUpdated = false;
    this.layout = new OpenViduLayout();
    let sessionName = "Session" + props.interviewTimeId;
    let userName = props.userName;
    const interviewId = props.interviewId;
    this.remotes = [];
    this.localUserAccessAllowed = false;
    this.state = {
      mySessionId: sessionName,
      myUserName: userName,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: "none",
      currentVideoDevice: undefined,
      isRecord: false,
      recordId: "",
      questionList: [],
      questionNum: 0,
    };

    this.navigate = this.props.navigate;
    this.handleSubscriber = this.props.handleSubscriber;

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.nicknameChanged = this.nicknameChanged.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.closeDialogExtension = this.closeDialogExtension.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.checkNotification = this.checkNotification.bind(this);
    this.checkSize = this.checkSize.bind(this);
    this.handleMicState = this.handleMicState.bind(this);
    this.storeResult = this.storeResult.bind(this);

    this.role = "PUBLISHER";
    if (props.positionId === 2) {
      this.role = "SUBSCRIBER";
    }
  }

  storeResult() {
    this.props.storeResult();
  }

  handleMicState() {
    this.props.handleMicState();
  }

  componentDidMount() {
    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: "OV_big", // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };

    this.layout.initLayoutContainer(
      document.getElementById("layout"),
      openViduLayoutOptions
    );
    window.addEventListener("beforeunload", this.onbeforeunload);
    window.addEventListener("resize", this.updateLayout);
    window.addEventListener("resize", this.checkSize);
    this.joinSession();
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
    window.removeEventListener("resize", this.updateLayout);
    window.removeEventListener("resize", this.checkSize);
    this.leaveSession();
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  joinSession() {
    this.OV = new OpenVidu();

    this.OV.setAdvancedConfiguration({
      publisherSpeakingEventsOptions: {
        interval: 100, // Frequency of the polling of audio streams in ms (default 100)
        threshold: -50, // Threshold volume in dB (default -50)
      },
    });

    this.setState(
      {
        session: this.OV.initSession(),
      },
      async () => {
        this.subscribeToStreamCreated();
        await this.connectToSession();
      }
    );

    http
      .get("/conference/question?interviewID=" + this.props.interviewId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log("질문리스트", response.data);
        this.setState({
          questionList: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async connectToSession() {
    if (this.props.token !== undefined) {
      console.log("token received: ", this.props.token);
      this.connect(this.props.token);
    } else {
      try {
        var token = await this.getToken();
        console.log(token);
        this.connect(token);
      } catch (error) {
        console.error(
          "There was an error getting the token:",
          error.code,
          error.message
        );
        if (this.props.error) {
          this.props.error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert("There was an error getting the token:", error.message);
      }
    }
  }

  connect(token) {
    this.state.session
      .connect(token, { clientData: this.state.myUserName })
      .then(() => {
        this.connectWebCam();
      })
      .catch((error) => {
        if (this.props.error) {
          this.props.error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert("There was an error connecting to the session:", error.message);
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message
        );
      });
  }

  async connectWebCam() {
    await this.OV.getUserMedia({
      audioSource: undefined,
      videoSource: undefined,
    });
    var devices = await this.OV.getDevices();
    var videoDevices = devices.filter((device) => device.kind === "videoinput");
    localUser.setAudioActive(false);
    localUser.setVideoActive(true);
    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: "640x480",
      frameRate: 30,
      insertMode: "APPEND",
    });

    if (this.state.session.capabilities.publish) {
      publisher.on("accessAllowed", () => {
        this.state.session.publish(publisher).then(() => {
          this.updateSubscribers();
          this.localUserAccessAllowed = true;
          if (this.props.joinSession) {
            this.props.joinSession();
          }
        });
      });
    }
    localUser.setNickname(this.props.userName);
    localUser.setConnectionId(this.state.session.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);

    this.subscribeToUserChanged();
    this.subscribeToStreamDestroyed();
    this.sendSignalUserChanged({
      isScreenShareActive: localUser.isScreenShareActive(),
    });

    this.setState(
      { currentVideoDevice: videoDevices[0], localUser: localUser },
      () => {
        this.state.localUser.getStreamManager().on("streamPlaying", (e) => {
          this.updateLayout();
          publisher.videos[0].video.parentElement.classList.remove(
            "custom-class"
          );
        });
      }
    );
  }

  updateSubscribers() {
    var subscribers = this.remotes;
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          this.sendSignalUserChanged({
            isAudioActive: this.state.localUser.isAudioActive(),
            isVideoActive: this.state.localUser.isVideoActive(),
            nickname: this.state.localUser.getNickname(),
            isScreenShareActive: this.state.localUser.isScreenShareActive(),
          });
        }
        this.updateLayout();
      }
    );
  }

  leaveSession() {
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      sessionName: "Session" + this.props.interviewTimeId,
      userName: this.props.userName,
      localUser: undefined,
    });
    if (this.props.leaveSession) {
      this.props.leaveSession();
    }

    // 질문자면 세션 종료
    if (this.role === "PUBLISHER") {
      axios
        .delete(
          "https://intube.store:8443/openvidu/api/sessions/" +
            "Session" +
            this.props.interviewTimeId,
          {
            headers: {
              Authorization: `Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.navigate("/questioner");
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      this.navigate("/");
      window.location.reload();
    }
  }
  camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    this.setState({ localUser: localUser });
    console.log(this.state);
    console.log(localUser);
  }

  micStatusChanged() {
    if (!localUser.isAudioActive() && this.props.isAvata) {
      console.log("질문", this.state.questionList[this.state.questionNum]);
      console.log(this.props.setQuestionState);
      if (this.state.questionList[this.state.questionNum] === undefined) {
        this.props.setQuestionState({
          question: "인터뷰가 종료되었습니다. 종료버튼을 눌러주세요😎",
          id: 0,
        });
      }
      this.props.setQuestionState({
        question: this.state.questionList[this.state.questionNum].content,
        id: this.state.questionList[this.state.questionNum].id,
      });
      this.setState({ questionNum: this.state.questionNum + 1 });
    }
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    this.setState({ localUser: localUser });
  }

  nicknameChanged(nickname) {
    let localUser = this.state.localUser;
    localUser.setNickname(nickname);
    this.setState({ localUser: localUser });
    this.sendSignalUserChanged({
      nickname: this.state.localUser.getNickname(),
    });
  }

  deleteSubscriber(stream) {
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream
    )[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  subscribeToStreamCreated() {
    this.state.session.on("streamCreated", (event) => {
      const subscriber = this.state.session.subscribe(event.stream);

      // var subscribers = this.state.subscribers;
      subscriber.on("streamPlaying", (e) => {
        this.checkSomeoneShareScreen();
        subscriber.videos[0].video.parentElement.classList.remove(
          "custom-class"
        );
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType("remote");
      const nickname = event.stream.connection.data.split("%")[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      this.remotes.push(newUser);
      if (this.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }

  subscribeToStreamDestroyed() {
    // On every Stream destroyed...

    this.state.session.on("streamDestroyed", (event) => {
      console.log(event);

      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream);
      setTimeout(() => {
        this.checkSomeoneShareScreen();
      }, 20);
      event.preventDefault();
      this.updateLayout();
    });
  }

  subscribeToUserChanged() {
    this.state.session.on("signal:userChanged", (event) => {
      let remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          console.log("EVENTO REMOTE: ", event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
          if (data.isScreenShareActive !== undefined) {
            user.setScreenShareActive(data.isScreenShareActive);
          }
        }
      });
      this.setState(
        {
          subscribers: remoteUsers,
        },
        () => this.checkSomeoneShareScreen()
      );
    });
  }

  updateLayout() {
    setTimeout(() => {
      this.layout.updateLayout();
    }, 20);
  }

  sendSignalUserChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    this.state.session.signal(signalOptions);
  }

  toggleFullscreen() {
    const document = window.document;
    const fs = document.getElementById("container");
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (fs.requestFullscreen) {
        fs.requestFullscreen();
      } else if (fs.msRequestFullscreen) {
        fs.msRequestFullscreen();
      } else if (fs.mozRequestFullScreen) {
        fs.mozRequestFullScreen();
      } else if (fs.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  async switchCamera() {
    try {
      if (!this.state.isRecord) {
        axios
          .post(
            "https://intube.store:8443/openvidu/api/recordings/start",
            JSON.stringify({
              session: "Session" + this.props.interviewTimeId,
              name: "MyRecording",
              hasAudio: true,
              hasVideo: true,
              outputMode: "COMPOSED",
              recordingLayout: "BEST_FIT",
              resolution: "1280x720",
              frameRate: 25,
              shmSize: 536870912,
              ignoreFailedStreams: false,
            }),
            {
              headers: {
                Authorization: `Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU`,
                "Content-type": "application/json",
              },
            }
          )
          .then((response) => {
            this.setState({ isRecord: true });
            this.setState({ recordId: response.data.id });
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        axios
          .post(
            "https://intube.store:8443/openvidu/api/recordings/stop/" +
              this.state.recordId,
            {},
            {
              headers: {
                Authorization: `Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU`,
              },
            }
          )
          .then((response) => {
            console.log(response.data.url);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (e) {
      console.error(e);
    }
  }

  screenShare() {
    const videoSource =
      navigator.userAgent.indexOf("Firefox") !== -1 ? "window" : "screen";
    const publisher = this.OV.initPublisher(
      undefined,
      {
        videoSource: videoSource,
        publishAudio: localUser.isAudioActive(),
        publishVideo: localUser.isVideoActive(),
        mirror: false,
      },
      (error) => {
        if (error && error.name === "SCREEN_EXTENSION_NOT_INSTALLED") {
          this.setState({ showExtensionDialog: true });
        } else if (error && error.name === "SCREEN_SHARING_NOT_SUPPORTED") {
          alert("Your browser does not support screen sharing");
        } else if (error && error.name === "SCREEN_EXTENSION_DISABLED") {
          alert("You need to enable screen sharing extension");
        } else if (error && error.name === "SCREEN_CAPTURE_DENIED") {
          alert("You need to choose a window or application to share");
        }
      }
    );

    publisher.once("accessAllowed", () => {
      this.state.session.unpublish(localUser.getStreamManager());
      localUser.setStreamManager(publisher);
      this.state.session.publish(localUser.getStreamManager()).then(() => {
        localUser.setScreenShareActive(true);
        this.setState({ localUser: localUser }, () => {
          this.sendSignalUserChanged({
            isScreenShareActive: localUser.isScreenShareActive(),
          });
        });
      });
    });
    publisher.on("streamPlaying", () => {
      this.updateLayout();
      publisher.videos[0].video.parentElement.classList.remove("custom-class");
    });
  }

  closeDialogExtension() {
    this.setState({ showExtensionDialog: false });
  }

  stopScreenShare() {
    this.state.session.unpublish(localUser.getStreamManager());
    this.connectWebCam();
  }

  checkSomeoneShareScreen() {
    let isScreenShared;
    // return true if at least one passes the test
    isScreenShared =
      this.state.subscribers.some((user) => user.isScreenShareActive()) ||
      localUser.isScreenShareActive();
    const openviduLayoutOptions = {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: isScreenShared,
      bigClass: "OV_big",
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      animate: true,
    };
    this.layout.setLayoutOptions(openviduLayoutOptions);
    this.updateLayout();
  }

  toggleChat(property) {
    let display = property;

    if (display === undefined) {
      display = this.state.chatDisplay === "none" ? "block" : "none";
    }
    if (display === "block") {
      this.setState({ chatDisplay: display, messageReceived: false });
    } else {
      console.log("chat", display);
      this.setState({ chatDisplay: display });
    }
    this.updateLayout();
  }
  toggleInfo() {
    this.props.toggleInfo();
  }

  checkNotification(event) {
    this.setState({
      messageReceived: this.state.chatDisplay === "none",
    });
  }
  checkSize() {
    if (
      document.getElementById("layout").offsetWidth <= 700 &&
      !this.hasBeenUpdated
    ) {
      this.toggleChat("none");
      this.hasBeenUpdated = true;
    }
    if (
      document.getElementById("layout").offsetWidth > 700 &&
      this.hasBeenUpdated
    ) {
      this.hasBeenUpdated = false;
    }
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const localUser = this.state.localUser;
    var chatDisplay = { display: this.state.chatDisplay };

    return (
      <div className="container" id="container">
        <ToolbarComponent
          sessionId={mySessionId}
          user={localUser}
          showNotification={this.state.messageReceived}
          camStatusChanged={this.camStatusChanged}
          micStatusChanged={this.micStatusChanged}
          screenShare={this.screenShare}
          stopScreenShare={this.stopScreenShare}
          toggleFullscreen={this.toggleFullscreen}
          switchCamera={this.switchCamera}
          leaveSession={this.leaveSession}
          toggleChat={this.toggleChat}
          toggleInfo={this.toggleInfo}
          handleMicState={this.handleMicState}
          handleChangeQuestion={this.props.handleChangeQuestion}
          // positionId={this.props.positionId}
          // conferenceId={this.props.conferenceID}
          // interviewTimeID={interviewTimeID}
          // interviewId={interviewId}
          storeResult={this.storeResult}
        />
        <DialogExtensionComponent
          showDialog={this.state.showExtensionDialog}
          cancelClicked={this.closeDialogExtension}
        />
        <Card sx={{ minWidth: 275, mt: 10 }}>
          <CardContent
            sx={{
              textAlign: "center",
              height: "35px",
            }}
          >
            {localUser !== undefined &&
              localUser.getStreamManager() !== undefined && (
                <NowQuestion
                  user={localUser}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                  question={this.props.state}
                  setQuestId={this.props.setQuestId}
                />
              )}
          </CardContent>
        </Card>
        <Grid
          container
          spacing={2}
          alignItems="flex-center"
          justifyContent="center"
          sx={{ backgroundColor: "#f2f7ff" }}
        >
          <Grid item xs={8}>
            <div id="layout" className="bounds">
              {this.props.isAvata && (
                <img src={Logo} alt="logo" width="130px" />
              )}
              {localUser !== undefined &&
                localUser.getStreamManager() !== undefined && (
                  <div
                    className="OT_root OT_publisher custom-class"
                    id="localUser"
                  >
                    <StreamComponent
                      user={localUser}
                      handleNickname={this.nicknameChanged}
                    />
                  </div>
                )}
              {this.state.subscribers.map((sub, i) => (
                <div
                  key={i}
                  className="OT_root OT_publisher custom-class"
                  id="remoteUsers"
                >
                  <StreamComponent
                    user={sub}
                    streamId={sub.streamManager.stream.streamId}
                  />
                </div>
              ))}
            </div>
            {localUser !== undefined &&
              localUser.getStreamManager() !== undefined && (
                <div
                  className="OT_root OT_publisher custom-class"
                  style={chatDisplay}
                >
                  <ChatComponent
                    user={localUser}
                    chatDisplay={this.state.chatDisplay}
                    close={this.toggleChat}
                    messageReceived={this.checkNotification}
                  />
                </div>
              )}

            <Paper
              elevation={3}
              sx={{ minWidth: 275, mt: 4, ml: 2, height: 320 }}
            >
              <Typography variant="h6" gutterBottom sx={{ pt: 2, ml: 2 }}>
                인터뷰 내용
              </Typography>
              <Divider />
              <div className="paper-contents">
                {localUser !== undefined &&
                  localUser.getStreamManager() !== undefined && (
                    <NowAnswer
                      role={this.role}
                      user={localUser}
                      chatDisplay={this.state.chatDisplay}
                      close={this.toggleChat}
                      messageReceived={this.checkNotification}
                      myAnswer={this.props.myAnswer}
                      isAvata={this.props.isAvata}
                    />
                  )}
              </div>
            </Paper>
          </Grid>
          {!this.props.isAvata && (
            <Grid item xs={4}>
              <QuestionLIst
                handleChangeQuestion={this.props.handleChangeQuestion}
                interviewId={this.props.interviewId}
                positionId={this.props.positionId}
              />
              <Paper
                elevation={3}
                sx={{ minWidth: 275, mt: 4, ml: 2, height: 320 }}
              >
                <Typography variant="h6" gutterBottom sx={{ pt: 2, ml: 2 }}>
                  참여자 정보
                </Typography>
                <Divider />
                <div className="paper-contents">
                  {this.state.subscribers.map((sub, i) => (
                    <div key={i}>
                      {sub.audioActive ? (
                        <div> {sub.nickname} : 발언중</div>
                      ) : (
                        <div> {sub.nickname} : 대기중</div>
                      )}
                    </div>
                  ))}
                </div>
              </Paper>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "conference/sessions",
      {
        customSessionId: sessionId,
        recordingMode: "ALWAYS",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  }

  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL +
        "conference/sessions/" +
        sessionId +
        "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  }
}
export default VideoRoomComponent;
