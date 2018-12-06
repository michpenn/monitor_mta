import React, { Component } from "react";
import Moment from "react-moment";

class Subway extends Component {
  render() {
    const { name, status, totalDownMins, startOfLastDelay } = this.props.subway;
    let today = new Date();
    let todayAbs = new Date();
    todayAbs.setHours(0);
    todayAbs.getMinutes(0);
    todayAbs.setSeconds(0);
    let now = today.getTime() - todayAbs.getTime();
    let todaySecs = (today.getTime() - todayAbs.getTime()) / 1000;
    let downSecs = totalDownMins * 60;
    let startDelay = startOfLastDelay != null ? new Date(startOfLastDelay) : 0;
    let secondsSinceDelay =
      startDelay === 0
        ? 0
        : startDelay.getSeconds() +
          60 * startDelay.getMinutes() +
          60 * 60 * startDelay.getHours();
    let totalDownSecs = secondsSinceDelay + downSecs;

    return (
      <React.Fragment>
        <tr>
          <td>{name}</td>
          <td>{status}</td>
          <td>{(1 - totalDownSecs / todaySecs) * 100}%</td>
        </tr>
      </React.Fragment>
    );
  }
}

export default Subway;
