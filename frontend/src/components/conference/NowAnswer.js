import React, { Component } from "react";

import Typography from "@mui/material/Typography";
export default class NowQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      answer: "",
      name: "",
    };
    this.chatScroll = React.createRef();
    this.sendAnswer = this.sendAnswer.bind(this);

    console.log("dddd");
    console.log(props.myAnswer.answer);
  }

  componentDidMount() {
    this.props.user
      .getStreamManager()
      .stream.session.on("signal:b", (event) => {
        const data = JSON.parse(event.data);
        let messageList = this.state.messageList;
        messageList.push({
          answer: data.answer,
          name: data.name,
        });
        this.setState({ messageList: messageList });
      });
  }
  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props.myAnswer.answer !== prevProps.myAnswer.answer) {
      await this.setState({
        answer: this.props.myAnswer.answer,
        name: this.props.myAnswer.name,
      });
      this.sendAnswer();
    }
  };
  sendAnswer() {
    if (this.props.user && this.state.answer) {
      let answer = this.state.answer.replace(/ +(?= )/g, "");
      const data = {
        answer: answer,
        name: this.state.name,
      };
      this.props.user.getStreamManager().stream.session.signal({
        data: JSON.stringify(data),
        type: "b",
      });
    }

    this.setState({ answer: "", name: "" });
  }

  render() {
    return (
      <div ref={this.chatScroll}>
        {this.state.messageList.map((data, i) => (
          <Typography variant="subtile2" component="div" gutterBottom>
            {data.name} : {data.answer}
          </Typography>
        ))}
      </div>
    );
  }
}
