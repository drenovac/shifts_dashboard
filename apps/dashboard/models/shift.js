// ==========================================================================
// Project:   Dashboard - models/shift
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Dashboard */

/** @class

  @extends SC.Object
*/

FIFTEEN_MINUTES = 15*60*1000;
THIRTY_MINUTES  = 30*60*1000;
ONE_HOUR        = 60*60*1000;

console.log(FIFTEEN_MINUTES);
console.log(THIRTY_MINUTES);
console.log(ONE_HOUR);

Dashboard.Shift = SC.Object.extend(
  /** @scope Dashboard.Shift.prototype */ {

  status: function() {
    var updatedAt = Dashboard.get('updatedAt'),
        callTaken = this.get('callTaken'),
        distance = callTaken - updatedAt;
    
    console.log(distance);
    
    if (distance < FIFTEEN_MINUTES ) return 0;
    else if (distance > FIFTEEN_MINUTES && distance < THIRTY_MINUTES) return 1;
    else if (distance > THIRTY_MINUTES && distance < ONE_HOUR) return 2;
    else return 3;
  }.property('callTaken').cacheable()

});
