// ==========================================================================
// Project:   Dashboard - models/shift
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals SC Dashboard */

/** @class

  @extends SC.Object
*/

var THIRTY_MINUTES     = 30*60*1000;
var FOURTY_EIGHT_HOURS = 48*60*60*1000;

Dashboard.Shift = SC.Object.extend(
  /** @scope Dashboard.Shift.prototype */ {

  status: function() {
    var age =  this.get('shiftAt') - Dashboard.get('updatedAt'),
        updatedAt = this.get('updatedAt');

    // we return a color if the shifts starts in the next 48 hours
    if (age < FOURTY_EIGHT_HOURS) {
      if (!updatedAt) {
        // if we've never updated, we turn green in the first 30 minutes,
        if (age > (FOURTY_EIGHT_HOURS - THIRTY_MINUTES)) return 1; // green
        // and red thereafter, unless
        else return 2; // red
      // we've updated the system, in which case we return green if it's been less than 30 minutens since we updated,
      } else if ((Dashboard.get('updatedAt') - updatedAt) < THIRTY_MINUTES) return 1; // green
      // and red otherwise
      else return 2; // red
      // shifts starting more than 48 hours from now show up as white
    }
    // otherwise, we return white
    else return 0; // white
  }.property('callTaken').cacheable(),

  shiftAt: function() {
    var dateTime = this.roster_date+' '+this.start_time.slice(0,-8)+'+10:00';
    return SC.DateTime.parse(dateTime, '%Y-%m-%d %H:%M:%S%Z')._ms;
  }.property(),

  updatedAt: function() {
    if (!this.updated_date || !this.updated_time) return 0;

    var dateTime = this.updated_date+' '+this.updated_time.slice(0,-8)+'+10:00';
    return SC.DateTime.parse(dateTime, '%Y-%m-%d %H:%M:%S%Z')._ms;
  }.property(),

  date: function(key, value) {
    var date = this.call_taken_date.split('-');
    return [date[2], date[1], date[0].slice(2)].join('/');
  }.property().cacheable(),

  callTaken: function(key, value) {
    var dateTime = this.call_taken_date+' '+this.call_taken_time.slice(0,-8)+'+10:00';
    // console.log(dateTime);
    return SC.DateTime.parse(dateTime, '%Y-%m-%d %H:%M:%S%Z')._ms;
  }.property().cacheable(),

  timeEntered: function() {
    return SC.DateTime.create(this.get('callTaken'))
        .adjust({ timezone: -600 })
        .toFormattedString('%H:%M');
  }.property('callTaken').cacheable(),

  dateAndTimeEntered: function() {
    return this.getEach('date', 'timeEntered').join(' - ');
  }.property('date', 'timeEntered').cacheable(),

  clientName: function(key, value) {
      return this.client_name;
  }.property().cacheable(),

  siteName: function(key, value) {
      return this.client_name; // FIXME: Should this be something else?
  }.property().cacheable(),

  due: function(key, value) {
    return this.start_time;
  }.property().cacheable(),

  employeeName: function(key, value) {
      return this.employee_name;
  }.property().cacheable(),

  finish: function(key, value) {
    return this.finish_time;
  }.property().cacheable(),
  
  shiftDate: function(key, value) {
      var date = this.roster_date.split('-');
      return [date[2], date[1], date[0].slice(2)].join('/');
  }.property().cacheable(),
  
  shiftTime: function(key, value) {
    return this.start_time.slice(0,-11)+'-'+this.finish_time.slice(0,-11);
  }.property().cacheable()

});
