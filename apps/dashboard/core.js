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
  
  rootState: SC.State.design({
    enterState: function() {
      Dashboard.mainPage.get('mainPane').append();
    }
  })

});
