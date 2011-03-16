// ==========================================================================
// Project:   Dashboard
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Dashboard */

/** @namespace
  @extends SC.Application
*/
Dashboard = SC.Application.create( SC.StatechartManager,
  /** @scope Dashboard.prototype */ {

  NAMESPACE: 'Dashboard',
  VERSION: '0.1.0',

  updatedAt: SC.DateTime.create()._ms,

  rootState: SC.State.design({
    enterState: function() {
      Dashboard.mainPage.get('mainPane').append();
      
      if (Dashboard.FIXTURES) {
        // only do this in debug mode
        Dashboard.shifts.set('content', Dashboard.FIXTURES);
      }
    }
  })

});
