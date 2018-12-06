import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import Subway from "./components/subways/Subway";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    subways: [],
    timeoutIntervalId: null
  };

  componentDidMount() {
    let testData = [
      {
        name: "1",
        status: "PLANNED WORK",
        startOfLastDelay: null,
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "2",
        status: "PLANNED WORK",
        startOfLastDelay: null,
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "3",
        status: "PLANNED WORK",
        startOfLastDelay: null,
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "4",
        status: "PLANNED WORK",
        startOfLastDelay: null,
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "5",
        status: "PLANNED WORK",
        startOfLastDelay: null,
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "6",
        status: "PLANNED WORK",
        startOfLastDelay: null,
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "7",
        status: "PLANNED WORK",
        startOfLastDelay: null,
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "A",
        status: "SERVICE CHANGE",
        startOfLastDelay: null,
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "C",
        status: "SERVICE CHANGE",
        startOfLastDelay: null,
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "E",
        status: "SERVICE CHANGE",
        startOfLastDelay: null,
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "B",
        status: "DELAYS",
        startOfLastDelay: "2018-12-06T12:32:00.000",
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "D",
        status: "DELAYS",
        startOfLastDelay: "2018-12-06T12:32:00.000",
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "F",
        status: "DELAYS",
        startOfLastDelay: "2018-12-06T12:32:00.000",
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "M",
        status: "DELAYS",
        startOfLastDelay: "2018-12-06T12:32:00.000",
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "G",
        status: "GOOD SERVICE",
        startOfLastDelay: null,
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "J",
        status: "PLANNED WORK",
        startOfLastDelay: null,
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "Z",
        status: "PLANNED WORK",
        startOfLastDelay: null,
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "L",
        status: "PLANNED WORK",
        startOfLastDelay: null,
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "N",
        status: "PLANNED WORK",
        startOfLastDelay: null,
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "Q",
        status: "PLANNED WORK",
        startOfLastDelay: null,
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "R",
        status: "PLANNED WORK",
        startOfLastDelay: null,
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "S",
        status: "GOOD SERVICE",
        startOfLastDelay: null,
        totalDownMins: 0,
        timeSinceBeginning: null
      },
      {
        name: "SIR",
        status: "DELAYS",
        startOfLastDelay: "2018-12-06T12:07:00.000",
        totalDownMins: 0,
        timeSinceBeginning: null
      }
    ];
    axios
      .get("/subways")
      .then(res => {
        console.log("res: ", res.data.subways);
        this.setState({ subways: res.data.subways });
      })
      .catch(err => {
        console.log("err: ", err);
        this.setState({ subways: testData });
      });

    let intervalId = setInterval(() => {
      this.checkForUpdates();
    }, 60000);

    this.setState({ timeoutIntervalId: intervalId });
  }

  checkForUpdates() {
    let currentSubways = this.state.subways;

    axios
      .post("/update", { subways: currentSubways })
      .then(function(response) {
        let updated = response.data.updatedSubways;
        if (updated.length > 0) {
          //todo: loop through, copy new status accross, increminent minutes, etc
          console.log("updated: ", updated);
        }
      })
      .catch(function(error) {
        console.log("error: ", error);
        /*
        TODO: Clear Interval if there is an error
         */
      });
  }

  render() {
    let subways = this.state.subways;
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
