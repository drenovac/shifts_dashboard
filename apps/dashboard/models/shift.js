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
    var updatedAt = Dashboard.get('updatedAt'),
        callTaken = this.get('callTaken'),
        distance = callTaken - updatedAt;

    if (distance < FIFTEEN_MINUTES ) return 3;
    else if (distance > FIFTEEN_MINUTES && distance < TWENTY_FIVE_MINUTES) return 2;
    else if (distance > TWENTY_FIVE_MINUTES && distance < THIRTY_MINUTES) return 1;
    else return 0;
  }.property('callTaken').cacheable()

});
