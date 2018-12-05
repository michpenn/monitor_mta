import React, { Component } from "react";

class Subway extends Component {
  render() {
    const { name, status, totalDownMins, totalMins } = this.props.subway;
    return (
      <React.Fragment>
        <tr>
          <td>{name}</td>
          <td>{status}</td>
          <td>{(1 - totalDownMins / totalMins) * 100}%</td>
        </tr>
      </React.Fragment>
    );
  }
}

export default Subway;
