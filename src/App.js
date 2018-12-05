import React, { Component } from "react";
import axios from "axios";
import Subway from "./components/subways/Subway";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    subways: []
  };

  componentDidMount() {
    let testData = [
      {
        name: "1",
        status: "SERVICE CHANGE",
        date: "12/05/2018",
        time: " 3:57PM",
        totalDownMins: 10,
        totalMins: 1000
      },
      {
        name: "2",
        status: "SERVICE CHANGE",
        date: "12/05/2018",
        time: " 3:57PM",
        totalDownMins: 10,
        totalMins: 1000
      },
      {
        name: "3",
        status: "SERVICE CHANGE",
        date: "12/05/2018",
        time: " 3:57PM",
        totalDownMins: 10,
        totalMins: 1000
      },
      {
        name: "4",
        status: "GOOD SERVICE",
        date: "",
        time: "",
        totalDownMins: 10,
        totalMins: 1000
      },
      {
        name: "5",
        status: "GOOD SERVICE",
        date: "",
        time: "",
        totalDownMins: 10,
        totalMins: 1000
      },
      {
        name: "6",
        status: "GOOD SERVICE",
        date: "",
        time: "",
        totalDownMins: 10,
        totalMins: 1000
      },
      {
        name: "7",
        status: "GOOD SERVICE",
        date: "",
        time: "",
        totalDownMins: 0,
        totalMins: 1000
      },
      {
        name: "A",
        status: "GOOD SERVICE",
        date: "",
        time: "",
        totalDownMins: 10,
        totalMins: 1000
      },
      {
        name: "C",
        status: "GOOD SERVICE",
        date: "",
        time: "",
        totalDownMins: 10,
        totalMins: 1000
      },
      {
        name: "E",
        status: "GOOD SERVICE",
        date: "",
        time: "",
        totalDownMins: 10,
        totalMins: 1000
      },
      {
        name: "B",
        status: "GOOD SERVICE",
        date: "",
        time: "",
        totalDownMins: 10,
        totalMins: 1000
      },
      {
        name: "D",
        status: "GOOD SERVICE",
        date: "",
        time: "",
        totalDownMins: 10,
        totalMins: 1000
      },
      {
        name: "F",
        status: "GOOD SERVICE",
        date: "",
        time: "",
        totalDownMins: 10,
        totalMins: 1000
      },
      {
        name: "M",
        status: "GOOD SERVICE",
        date: "",
        time: "",
        totalDownMins: 10,
        totalMins: 1000
      },
      {
        name: "G",
        status: "GOOD SERVICE",
        date: "",
        time: "",
        totalDownMins: 0,
        totalMins: 1000
      },
      {
        name: "J",
        status: "GOOD SERVICE",
        date: "",
        time: "",
        totalDownMins: 10,
        totalMins: 1000
      },
      {
        name: "Z",
        status: "GOOD SERVICE",
        date: "",
        time: "",
        totalDownMins: 10,
        totalMins: 1000
      },
      {
        name: "L",
        status: "GOOD SERVICE",
        date: "",
        time: "",
        totalDownMins: 0,
        totalMins: 1000
      },
      {
        name: "N",
        status: "GOOD SERVICE",
        date: "",
        time: "",
        totalDownMins: 10,
        totalMins: 1000
      },
      {
        name: "Q",
        status: "GOOD SERVICE",
        date: "",
        time: "",
        totalDownMins: 10,
        totalMins: 1000
      },
      {
        name: "R",
        status: "GOOD SERVICE",
        date: "",
        time: "",
        totalDownMins: 10,
        totalMins: 1000
      },
      {
        name: "S",
        status: "GOOD SERVICE",
        date: "",
        time: "",
        totalDownMins: 0,
        totalMins: 1000
      },
      {
        name: "SIR",
        status: "GOOD SERVICE",
        date: "",
        time: "",
        totalDownMins: 0,
        totalMins: 1000
      }
    ];
    axios
      .get("/subways")
      .then(res => {
        console.log("res: ", res);
        this.setState({ subways: res.data.subways });
      })
      .catch(err => {
        console.log("err: ", err);
        this.setState({ subways: testData });
      });
  }

  render() {
    console.log("state: ", this.state);
    let subways = this.state.subways;
    // let subways = this.state.subways
    //   ? this.state.subways.length > 0
    //     ? this.state.subways
    //     : this.state.subways.data.subways
    //   : null;
    return (
      <div className="App">
        <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
          <div className="container">
            <a href="/" className="navbar-brand">
              Subway Status
            </a>
          </div>
        </nav>
        <div className="container">
          <h1 className="display-4 mb-2">
            <span className="text-danger">Subway</span> Lines
          </h1>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Uptime</th>
                </tr>
              </thead>
              <tbody>
                {subways.map((subway, index) => (
                  <Subway key={index} subway={subway} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
