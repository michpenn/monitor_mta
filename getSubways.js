const moment = require("moment");

class SubwayLine {
  constructor(name, status) {
    this.name = name;
    this.status = status;
    this.startOfLastDelay = null;
    this.totalDownMins = 0;
    this.timeSinceBeginning = null;
  }

  getStatus() {
    return this.status;
  }

  addStartOfDelay(time) {
    this.startOfLastDelay = moment(time, "hh:mma");
  }

  calculateTotalDelay() {
    /*TODO: 
    Remove old delay timestamp, 
    calculate number of minutes delayed for, 
    and update total minutes delayed
     */
  }

  updateStatus(newStatus, time) {
    let oldStatus = this.getStatus();

    if (oldStatus === newStatus) {
      return;
    }

    if (oldStatus !== "DELAYS" && newStatus == "DELAYS") {
      console.log(`Line ${this.name} is experiencing delays`);
      this.addStartOfDelay(time);
    } else if (oldStatus == "DELAYS" && newStatus !== "DELAYS") {
      console.log(`Line ${this.name} is now recovered`);
      this.calculateTotalDelay();
    }

    return (this.status = newStatus);
  }
}

function updateSubway(oldData, newData) {
  if (oldData.status !== newData.status) {
    let sub = new SubwayLine(oldData.name, oldData.status);
    sub.updateStatus(newData.status, newData.Time);
    /*
    TODO: enable this to set the culumative minutes delayed
    */
    return sub;
  }
  return false;
}

const getSubways = function(subwayStatusData, subwayLines) {
  const subways = subwayLines ? subwayLines : [];
  const updatedSubways = [];

  if (subwayLines) {
    subwayStatusData.forEach(group => {
      if (group.name.length === 1 || group.name === "SIR") {
        let sub = subwayLines.find(subway => {
          return group.name === subway.name;
        });
        let updatedSub = updateSubway(sub, group);
        updatedSubways.push(updatedSub);
      } else {
        let lines = group.name.split("");
        lines.forEach(line => {
          let sub = subwayLines.find(subway => {
            return line === subway.name;
          });
          let updatedSub = updateSubway(sub, group);
          updatedSubways.push(updatedSub);
        });
      }
    });
    return updatedSubways;
  } else {
    subwayStatusData.forEach(group => {
      if (group.name.length === 1 || group.name === "SIR") {
        let subway = new SubwayLine(group.name, null);
        subway.updateStatus(group.status, group.Time);
        subways.push(subway);
      } else {
        let lines = group.name.split("");
        lines.forEach(line => {
          let subway = new SubwayLine(line, null);
          subway.updateStatus(group.status, group.Time);
          subways.push(subway);
        });
      }
    });

    return subways;
  }
};

module.exports = getSubways;
