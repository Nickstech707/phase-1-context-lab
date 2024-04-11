/* Your Code Here */
// Function to create an employee record object with relevant data
let createEmployeeRecord = function (row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

// Function to process multiple employee rows into records
let createEmployeeRecords = function (employeeRowData) {
  return employeeRowData.map(function (row) {
    return createEmployeeRecord(row);
  });
};

// Function to track clock-in time events
let createTimeInEvent = function (dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return this;
};

// Function to track clock-out time events
let createTimeOutEvent = function (dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });

  return this;
};

// Function to calculate hours worked on a specific date
let hoursWorkedOnDate = function (soughtDate) {
  let inEvent = this.timeInEvents.find(function (e) {
    return e.date === soughtDate;
  });

  let outEvent = this.timeOutEvents.find(function (e) {
    return e.date === soughtDate;
  });

  return (outEvent.hour - inEvent.hour) / 100;
};

// Function to compute the earnings for a given date
let wagesEarnedOnDate = function (dateSought) {
  let rawWage = hoursWorkedOnDate.call(this, dateSought) * this.payPerHour;
  return parseFloat(rawWage.toString());
};

// Function to sum up all wages for an employee
let allWagesFor = function () {
  let eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  );

  return payable;
};

// Function to find an employee by first name
let findEmployeeByFirstName = function (srcArray, firstName) {
  return srcArray.find(function (rec) {
    return rec.firstName === firstName;
  });
};

// Function to calculate the total payroll for a set of employee records
let calculatePayroll = function (arrayOfEmployeeRecords) {
  return arrayOfEmployeeRecords.reduce(function (memo, rec) {
    return memo + allWagesFor.call(rec);
  }, 0);
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// const allWagesFor = function () {
//   const eligibleDates = this.timeInEvents.map(function (e) {
//     return e.date;
//   });

//   const payable = eligibleDates.reduce(
//     function (memo, d) {
//       return memo + wagesEarnedOnDate.call(this, d);
//     }.bind(this),
//     0
//   ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

//   return payable;
// };
