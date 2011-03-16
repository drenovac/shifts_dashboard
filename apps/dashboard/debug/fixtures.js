// ==========================================================================
// Project:   Dashboard - debug/fixtures
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals SC Dashboard */

// This code is only available during development.

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
  var now = SC.DateTime.create().toFormattedString('%H:%M'),
      idx, len;

  for (idx=0, len=100; idx<len; ++idx) {
    Dashboard.FIXTURES.pushObject(SC.Object.create({
      client: 'Client ' + idx,
      roster: now,
      start: now,
      finish: now,
      callTaken: now,
      employee: 'Employee ' + idx * 2,
      source: 'Source ' + idx % 2
    }));
  }
  
  console.log('Created '+Dashboard.FIXTURES.length+' fixtures.');
})();