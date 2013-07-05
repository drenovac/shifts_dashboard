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
    trace: true,
    rootState: Ki.State.design({
      initialSubstate: "ZOOMEDOUT",
      enterState: function() {
        Dashboard.mainPage.get('mainPane').append();

        // if (Dashboard.FIXTURES) {
        //   // only do this in debug mode
        //   var ary = Dashboard._shifts = Dashboard.FIXTURES;
        //   ary = Dashboard.computeFilteredShifts(ary);
        //   Dashboard.shifts.set('content', ary);
        // }

        Dashboard.sources.set('content', [
          SC.Object.create({ name: 'CSS NSW', sources: ['EDHEAL'] }),
          SC.Object.create({ name: 'CSS QLD', sources: ['EDHEALQLD'] }),
          SC.Object.create({name:"CSS VIC/SA/NT",sources:["EDHEALVIC","EDHEALSA","EDHEALNT"]}),
          SC.Object.create({ name: 'ALL', sources: [] }) // implies "all"
        ]);

        Dashboard._timer = SC.Timer.schedule({
          target: Dashboard,
          action: 'requestShifts',
          interval: 30000, // 30 seconds
          repeats: true
        });

        Dashboard.requestShifts();
      },

      updatedClient: function(sender) {
        alert('updatedClient called');
      },

      response: function(request) {
        var json = request.get('response'),
            idx, len, hash, ary = [];

        // console.log(JSON.stringify(json));

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
            selectedObject = sel ? sel.firstObject() : null,
            names = selectedObject ? selectedObject.get('sources') : [],
            ary ;

        Dashboard.set('names', names);
        ary = Dashboard.computeFilteredShifts(Dashboard._shifts);
        Dashboard.shifts.set('content', ary);
      },

      ZOOMEDOUT: Ki.State.design({
        enterState: function() {
          var pane = Dashboard.mainPage.get('mainPane'),
            layout;
          // pane.get('appTitle').set('isVisible', true);
          // pane.get('sources').set('isVisible', true);

          // ShiftsHeader
          layout = pane.getPath('shiftsHeader.layout');
          layout.top = 60;
          layout.left = 150;
          pane.get('shiftsHeader').propertyDidChange('layout');
          // Shifts
          layout = pane.getPath('shifts.layout');
          layout.top = 60;
          layout.left = 150;
          pane.get('shifts').propertyDidChange('layout');
        },

        zoomView: function(sender) {
          this.gotoState('ZOOMEDIN');
        },
      }),

      ZOOMEDIN: Ki.State.design({
        enterState: function() {
          var pane = Dashboard.mainPage.get('mainPane'),
            layout;
          // pane.get('appTitle').set('isVisible', false);
          // pane.get('sources').set('isVisible', false);

          // ShiftsHeader
          layout = pane.getPath('shiftsHeader.layout');
          layout.top = 10;
          layout.left = 10;
          pane.get('shiftsHeader').propertyDidChange('layout');
          // Shifts
          layout = pane.getPath('shifts.layout');
          layout.top = 10;
          layout.left = 10;
          pane.get('shifts').propertyDidChange('layout');

        },
        zoomView: function(sender) {
          this.gotoState('ZOOMEDOUT');
        },
      })

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
    console.log('requesting shifts');
    // SC.Request.getUrl(sc_static('api/v1.json'))
    SC.Request.getUrl('/api/v1')
      .notify(200, this, function (request) {
        Dashboard.statechart.invokeStateMethod('response', request);
      })
      .set('isJSON', true)
      .send() ;
  }

});
