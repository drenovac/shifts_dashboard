// ==========================================================================
// Project:   Dashboard - debug/fixtures
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals SC Dashboard sc_require */

// This code is only available during development.

sc_require('models/shift');

Dashboard.FIXTURES = [];

/* The SQL table:
  [client] [varchar](50) NOT NULL,
  [roster_date] [date] NOT NULL,
  [start_time] [time](7) NOT NULL,
  [finish_time] [time](7) NOT NULL,
  [call_taken_date] [date] NOT NULL,
  [call_taken_time] [time](7) NOT NULL,
  [employee] [varchar](50) NULL,
  [source] [varchar](50) NULL
*/
/*
  Example JSON receieved from the server:

    [{
        "client": "224",
        "client_name": "Client 224 name",
        "roster_date": "2011-04-04",
        "start_time": "09:00:00.0000000",
        "finish_time": "15:30:00.0000000",
        "call_taken_date": "2011-04-04",
        "call_taken_time": "13:20:00.0000000",
        "employee": "666a",
        "employee_name": "Operator 1",
        "source": "EDHEALQLD"
    },
    {
        "client": "224",
        "client_name": "Client 224 name",
        "roster_date": "2011-04-04",
        "start_time": "09:00:00.0000000",
        "finish_time": "15:30:00.0000000",
        "call_taken_date": "2011-04-05",
        "call_taken_time": "13:20:00.0000000",
        "employee": "666a",
        "employee_name": "Operator 1",
        "source": "EDHEALQLD"
    },
    {
        "client": "224",
        "client_name": "Client 224 name",
        "roster_date": "2011-04-04",
        "start_time": "09:00:00.0000000",
        "finish_time": "15:30:00.0000000",
        "call_taken_date": "2011-04-06",
        "call_taken_time": "13:20:00.0000000",
        "employee": "666b",
        "employee_name": "Operator 1",
        "source": "EDHEALQLD"
    },
    {
        "client": "225",
        "client_name": "Client 225 name",
        "roster_date": "2011-04-04",
        "start_time": "09:00:00.0000000",
        "finish_time": "15:30:00.0000000",
        "call_taken_date": "2011-04-04",
        "call_taken_time": "14:06:00.0000000",
        "employee": "fred",
        "employee_name": "Operator 1",
        "source": "EDHEALQLD"
    }]
*/
// (function() {
//   var now = [
//         SC.DateTime.create()._ms,
//         SC.DateTime.create()._ms + FIFTEEN_MINUTES + 1,
//         SC.DateTime.create()._ms + THIRTY_MINUTES + 1
//       ],
//       idx, len;
// 
//   for (idx=0, len=100; idx<len; ++idx) {
//     Dashboard.FIXTURES.pushObject(Dashboard.Shift.create({
//       client: 'Client ' + idx,
//       roster: now[0],
//       start: now[0],
//       finish: now[0],
//       callTaken: now[idx % 3],
//       employee: 'Employee ' + idx * 2,
//       source: 'Source ' + idx % 2
//     }));
//   }
//   
//   console.log('Created '+Dashboard.FIXTURES.length+' fixtures.');
// })();
