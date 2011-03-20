// ==========================================================================
// Project:   Dashboard - models/shift
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Dashboard */

/** @class

  @extends SC.Object
*/

FIFTEEN_MINUTES     = 15*60*1000;
TWENTY_FIVE_MINUTES = 25*60*1000;
THIRTY_MINUTES      = 30*60*1000;

Dashboard.Shift = SC.Object.extend(
  /** @scope Dashboard.Shift.prototype */ {

  status: function() {
    var age = Dashboard.get('updatedAt') - this.get('callTaken');

    // console.log(age)

    if      (age < FIFTEEN_MINUTES )                             return 3;
    else if (age > FIFTEEN_MINUTES && age < TWENTY_FIVE_MINUTES) return 2;
    else if (age > TWENTY_FIVE_MINUTES && age < THIRTY_MINUTES)  return 1;
    else                                                         return 0;
  }.property('callTaken').cacheable(),

  roster: function(key, value) {
    return this.roster_date;
  }.property().cacheable(),

  callTaken: function(key, value) {
    var dateTime = this.call_taken_date+' '+this.call_taken_time;
    // console.log(dateTime);
    return SC.DateTime.parse(dateTime, '%Y-%m-%d %H:%M:%S.%s')._ms;
  }.property().cacheable(),

  start: function(key, value) {
    return this.start_time;
  }.property().cacheable(),

  finish: function(key, value) {
    return this.finish_time;
  }.property().cacheable()

});
