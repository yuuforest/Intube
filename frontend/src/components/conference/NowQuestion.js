import React, { Component } from "react";

import Typography from "@mui/material/Typography";
export default class NowQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: ["질문이 시작되면 이곳에 질문이 나옵니다"],
      message: "질문이 시작되면 이곳에 질문이 나옵니다",
    };
    this.chatScroll = React.createRef();
    this.sendQuestion = this.sendQuestion.bind(this);
  }

  componentDidMount() {
    this.props.user
      .getStreamManager()
      .stream.session.on("signal:a", (event) => {
        const data = JSON.parse(event.data);
        let messageList = this.state.messageList;
        messageList.push({
          message: data.message,
          id: data.id,
        });
        this.props.setQuestId(data.id);
        this.setState({ messageList: messageList });
      });
  }
  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props.question !== prevProps.question) {
      await this.setState({
        message: this.props.question.question,
        id: this.props.question.id,
      });
      this.sendQuestion();
    }
  };
  sendQuestion() {
    if (this.props.user && this.state.message) {
      let message = this.state.message.replace(/ +(?= )/g, "");
      const data = {
        message: message,
        id: this.state.id,
      };
      this.props.user.getStreamManager().stream.session.signal({
        data: JSON.stringify(data),
        type: "a",
      });
    }

    let answer = this.state.message.replace(/ +(?= )/g, "");
    const data = {
      answer: answer,
      name: "질문",
    };
    this.props.user.getStreamManager().stream.session.signal({
      data: JSON.stringify(data),
      type: "b",
    });

    this.setState({ message: "" });
  }

  render() {
    return (
      <div ref={this.chatScroll}>
        {this.state.messageList.map(
          (data, i) =>
            i === this.state.messageList.length - 1 && (
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                }}
              >
                현재 질문 : {data.message}
              </Typography>
            )
        )}
      </div>
    );
  }
}
