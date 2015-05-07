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
    var ret = "Weekly Bookings: %@",
        names = this.get('names'),
        weeklyShifts = this.get('weeklyShifts'),
        shift = null,
        total = "",
        allShifts = false;

    function display2(numberStr) {
      return Math.round(parseInt(numberStr, 10) / 100) / 100;
    }

    if (weeklyShifts === null) {
      // do nothing;
    } else if (names.length === 0) {
      for (var name in weeklyShifts) {
        if (weeklyShifts.hasOwnProperty(name)) {
//          console.log('Getting name', name, weeklyShifts[name]);
          shift = weeklyShifts[name];
          total += shift.user_2+": <span class='number'>"+display2(shift.user_1)+"</span> ";
        }
      }
    } else {
      names.forEach(function(name) {
        shift = weeklyShifts[name];
        total += shift.user_2 + ": <span class='number'>" + display2(shift.user_1) + "</span> ";
      });
    }

    return ret.fmt(total);
  }.property('weeklyShifts', 'names').cacheable()
  
});
