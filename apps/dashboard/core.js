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

  updatedAt: null,

  statechart: Ki.Statechart.create({
    rootState: Ki.State.design({
      enterState: function() {
        Dashboard.mainPage.get('mainPane').append();

        // if (Dashboard.FIXTURES) {
        //   // only do this in debug mode
        //   var ary = Dashboard._shifts = Dashboard.FIXTURES;
        //   ary = Dashboard.computeFilteredShifts(ary);
        //   Dashboard.shifts.set('content', ary);
        // }

        Dashboard.sources.set('content', [
          SC.Object.create({ name: 'SOURCE' }),
          SC.Object.create({ name: 'COMPANY-2' }),
          SC.Object.create({ name: 'COMPANY-3' })
        ]);

        Dashboard._timer = SC.Timer.schedule({
          target: Dashboard,
          action: 'requestShifts',
          interval: 30000, // 30 seconds
          repeats: true
        });

        Dashboard.requestShifts();
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
        Dashboard._shifts = ary;
        ary = Dashboard.computeFilteredShifts(ary);
        Dashboard.shifts.set('content', ary);
      },

      changeSource: function(sender) {
        var sel = Dashboard.sources.get('selection'),
            names = sel ? sel.getEach('name') : [],
            ary ;

        Dashboard.set('names', names);
        ary = Dashboard.computeFilteredShifts(Dashboard._shifts);
        Dashboard.shifts.set('content', ary);
      }

    })
  }),

  _shifts: [],

  computeFilteredShifts: function(shifts) {
    var names = this.get('names'),
        idx, len, obj, ary = [];

    if (names.length === 0) return shifts;

    for (idx=0, len=shifts.length; idx<len; ++idx) {
      obj = shifts[idx];
      if (names.indexOf(obj.get('source')) !== -1) {
        ary.push(obj);
      }
    }

    return ary;
  },

  names: [], // default to "all names"

  requestShifts: function() {
    // console.log('requesting shifts');
    SC.Request.getUrl('/api/v1')
      .notify(200, this, function (request) {
        Dashboard.statechart.invokeStateMethod('response', request);
      })
      .set('isJSON', true)
      .send() ;
  }

});
