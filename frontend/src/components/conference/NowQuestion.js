import React, { Component } from "react";
import Typography from "@mui/material/Typography";
export default class NowQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      message: "",
    };
    this.chatScroll = React.createRef();

    this.sendQuestion = this.sendQuestion.bind(this);
  }

  componentDidMount() {
    this.props.user
      .getStreamManager()
      .stream.session.on("signal:chat", (event) => {
        const data = JSON.parse(event.data);
        let messageList = this.state.messageList;
        messageList.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          message: data.message,
        });

        this.setState({ messageList: messageList });
      });
  }
  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props.question !== prevProps.question) {
      //하위컴포넌트가 받은 props값 적어주기(둘다)
      await this.setState({ message: this.props.question.question });
      this.sendQuestion();
      console.log("지금상태");
      console.log(this.state);
    }
  };
  sendQuestion() {
    if (this.props.user && this.state.message) {
      let message = this.state.message.replace(/ +(?= )/g, "");
      if (message !== "" && message !== " ") {
        const data = {
          message: message,
        };
        this.props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        });
      }
    }
    this.setState({ message: "" });
  }

  render() {
    return (
      <div className="message-wrap" ref={this.chatScroll}>
        {this.state.messageList.map(
          (data, i) =>
            i === this.state.messageList.length - 1 && (
              <Typography variant="h1" gutterBottom>
                Q1. {data.message}
              </Typography>
            )
        )}
      </div>
    );
  }
}
