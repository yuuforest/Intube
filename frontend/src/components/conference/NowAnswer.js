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
      .stream.session.on("signal:b", (event) => {
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
    if (this.props.myAnswer !== prevProps.myAnswer) {
      await this.setState({
        answer: this.props.question.answer,
        name: this.props.question.name,
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
        type: "b",
      });
    }

    this.setState({ message: "" });
  }

  render() {
    return (
      <div ref={this.chatScroll}>
        {this.state.messageList.map(
          (data, i) =>
            i === this.state.messageList.length - 1 && (
              <Typography variant="h4" gutterBottom>
                Q{data.id}. {data.message}
              </Typography>
            )
        )}
      </div>
    );
  }
}
