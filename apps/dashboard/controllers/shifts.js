// ==========================================================================
// Project:   Dashboard - controllers/shifts
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals SC sc_require Dashboard */

sc_require('controllers/sources');

Dashboard.shifts = SC.ArrayController.create({

  orderBy: ['roster_date', 'start_time']

});
