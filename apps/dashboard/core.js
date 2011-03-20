// ==========================================================================
// Project:   Dashboard
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals SC Ki Dashboard */

/** @namespace
  @extends SC.Application
*/
Dashboard = SC.Application.create(
  /** @scope Dashboard.prototype */ {

  NAMESPACE: 'Dashboard',
  VERSION: '0.1.0',

  updatedAt: SC.DateTime.create()._ms,

  statechart: Ki.Statechart.create({
    rootState: Ki.State.design({
      enterState: function() {
        Dashboard.mainPage.get('mainPane').append();

        // if (Dashboard.FIXTURES) {
        //   // only do this in debug mode
        //   Dashboard.shifts.set('content', Dashboard.FIXTURES);
        // }

        SC.Request.getUrl('/api/v1')
          .notify(this, function (request) {
            Dashboard.statechart.invokeStateMethod('response', request);
          })
          .set('isJSON', true)
          .send() ;
      },

      response: function(request) {
        var json = request.get('response'),
            idx, len, hash, ary = [];

        // console.log(json);

        for (idx=0, len=json.length; idx<len; ++idx) {
          hash = json[idx];
          ary.push(Dashboard.Shift.create(hash));
        }

        // MUST set updatedAt before setting the array controller content
        Dashboard.set('updatedAt', SC.DateTime.create()._ms);
        Dashboard.shifts.set('content', ary);
      }
    })
  })

});
