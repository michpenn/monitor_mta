import React, { Component } from "react";

class Subway extends Component {
  calculateDownTime(totalDownMins, startOfLastDelay) {
    let today = new Date();
    let todayAbs = new Date();
    todayAbs.setHours(0);
    todayAbs.getMinutes(0);
    todayAbs.setSeconds(0);
    let todayInSecs = (today.getTime() - todayAbs.getTime()) / 1000;
    let cumulativeDownSecs = totalDownMins * 60;
    let startDelayTimeInSecs = 0;

    if (startOfLastDelay !== null) {
      let startDelay = new Date(startOfLastDelay);
      startDelayTimeInSecs =
        startDelay.getSeconds() +
        60 * startDelay.getMinutes() +
        60 * 60 * startDelay.getHours();
      cumulativeDownSecs += todayInSecs - startDelayTimeInSecs;
    }

    return cumulativeDownSecs / todayInSecs;
  }
  render() {
    const { name, status, totalDownMins, startOfLastDelay } = this.props.subway;
    let downTime = this.calculateDownTime(totalDownMins, startOfLastDelay);

    return (
      <React.Fragment>
        <tr>
          <td>{name}</td>
          <td>{status}</td>
          <td>{Math.round((1 - downTime) * 100)}%</td>
        </tr>
      </React.Fragment>
    );
  }
}

export default Subway;
