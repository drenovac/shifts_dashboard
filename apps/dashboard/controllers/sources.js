// ==========================================================================
// Project:   Dashboard - controllers/sources
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals SC Dashboard */

Dashboard.sources = SC.ArrayController.create({

  orderBy: 'name',

  allowsEmptySelection: false,
  allowsMultipleSelection: false,

  names: function() {
    var sel = Dashboard.sources.get('selection'),
        selectedObject = sel ? sel.firstObject() : null,
        names = selectedObject ? selectedObject.get('sources') : [];

    return names;
  }.property('selection').cacheable(),

  weeklyShifts: null,
  weeklyShiftsString: function() {
    var ret = "Total Weekly Shift Bookings: %@ Hours",
        names = this.get('names'),
        weeklyShifts = this.get('weeklyShifts'),
        total = 0,
        allShifts = false;

    if (weeklyShifts === null) {
      // do nothing;
    } else if (names.length === 0) {
      for (var week in weeklyShifts) {
        if (weeklyShifts.hasOwnProperty(week)) {
//          console.log('Getting week', week, weeklyShifts[week]);
          total += parseInt(weeklyShifts[week].user_1, 10);
        }
      }
    } else {
      names.forEach(function(sel) {
        total += parseInt(weeklyShifts[sel].user_1, 10);
      });
    }

    total = Math.round(total / 100) / 100;

    return ret.fmt(total);
  }.property('weeklyShifts', 'names').cacheable()
  
});
