// ==========================================================================
// Project:   Dashboard - debug/fixtures
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals SC Dashboard */

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
(function() {
  var now = [
        SC.DateTime.create().toFormattedString('%H:%M'),
        SC.DateTime.create().adjust({ minute: 16 }).toFormattedString('%H:%M'),
        SC.DateTime.create().adjust({ minute: 31 }).toFormattedString('%H:%M'),
        SC.DateTime.create().adjust({ minute: 61 }).toFormattedString('%H:%M')
      ],
      idx, len;

  for (idx=0, len=100; idx<len; ++idx) {
    Dashboard.FIXTURES.pushObject(Dashboard.Shift.create({
      client: 'Client ' + idx,
      roster: now[0],
      start: now[0],
      finish: now[0],
      callTaken: now[idx % 4],
      employee: 'Employee ' + idx * 2,
      source: 'Source ' + idx % 2,
      status: idx % 4
    }));
  }
  
  console.log('Created '+Dashboard.FIXTURES.length+' fixtures.');
})();