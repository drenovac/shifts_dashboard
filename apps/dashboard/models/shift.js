// ==========================================================================
// Project:   Dashboard - models/shift
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals SC Dashboard */

/** @class

  @extends SC.Object
*/

var FIFTEEN_MINUTES     = 15*60*1000;
var THIRTY_MINUTES      = 30*60*1000;

Dashboard.Shift = SC.Object.extend(
  /** @scope Dashboard.Shift.prototype */ {

  status: function() {
    var age = Dashboard.get('updatedAt') - this.get('callTaken');

    // console.log(age)

    if      (age < FIFTEEN_MINUTES )                        return 2;
    else if (age > FIFTEEN_MINUTES && age < THIRTY_MINUTES) return 1;
    else                                                    return 0;
  }.property('callTaken').cacheable(),

  date: function(key, value) {
    var date = this.roster_date.split('-');
    return [date[2], date[1], date[0].slice(2)].join('/');
  }.property().cacheable(),

  callTaken: function(key, value) {
    var dateTime = this.call_taken_date+' '+this.call_taken_time.slice(0,-8)+'+10:00';
    // console.log(dateTime);
    return SC.DateTime.parse(dateTime, '%Y-%m-%d %H:%M:%S%Z')._ms;
  }.property().cacheable(),

  due: function(key, value) {
    return this.start_time;
  }.property().cacheable(),

  finish: function(key, value) {
    return this.finish_time;
  }.property().cacheable(),
  
  shift: function(key, value) {
    return this.start_time.slice(0,-11)+'-'+this.finish_time.slice(0,-11);
  }.property().cacheable()

});
