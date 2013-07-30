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
  viewDates: 0,
  viewDatesDidChange: function() {
    this.invokeLater(function() {
      // console.log("Date Value changed");
      Dashboard.statechart.sendAction('changeSource');
    },0);
  }.observes('viewDates'),

  local: SC.UserDefaults.create({ appDomain: "shifts" }),

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

        Dashboard.setFontSize(Dashboard.local.get('fontSize'));

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
        Dashboard.scroll();
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
        Dashboard.resetScroll();
      },

      changeSource: function(sender) {
        var sel = Dashboard.sources.get('selection'),
            selectedObject = sel ? sel.firstObject() : null,
            names = selectedObject ? selectedObject.get('sources') : [],
            ary ;

        Dashboard.set('names', names);
        ary = Dashboard.computeFilteredShifts(Dashboard._shifts);
        Dashboard.shifts.set('content', ary);
        Dashboard.resetScroll();
      },

      bigger: function() {
        Dashboard.setFontSize
      },

      ZOOMEDOUT: Ki.State.design({
        enterState: function() {
          var pane = Dashboard.mainPage.get('mainPane'),
            layout;
          pane.get('appTitle').set('isVisible', true);
          pane.get('sources').set('isVisible', true);

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
          pane.get('appTitle').set('isVisible', false);
          pane.get('sources').set('isVisible', false);

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
        viewDates = this.get('viewDates'),
        startDate, endDate,
        allShifts = false,
        shiftAt, idx, len, obj, ary = [];

    // Filter Visible Dates
    if (viewDates) {
      startDate = SC.DateTime.create({hour:0})._ms
      endDate = SC.DateTime.create({hour:0}).advance({day: viewDates})._ms
    }

    if (names.length === 0) allShifts = true;

    for (idx=0, len=shifts.length; idx<len; ++idx) {
      obj = shifts[idx];
      shiftAt = obj.get('shiftAt')
      if (
        (allShifts || names.indexOf(obj.get('source')) !== -1) && 
        (!viewDates || (shiftAt >= startDate && shiftAt <= endDate))
      ) {
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
  },

  lastMouse: 0,
  scrollTime: 8000,
  scrollDistance: 1000,
  delay: 3000,
  scroll: function() {
    var now = performance.now(),
      sinceMove = now - Dashboard.lastMouse
      delay = Dashboard.delay;
    if (sinceMove > delay) {
      var shifts = Dashboard.mainPage.getPath('mainPane.shifts').get('layer'),
        viewHeight = shifts.offsetHeight,
        fullHeight = shifts.scrollHeight,
        current = shifts.scrollTop,
        passed = sinceMove - delay,
        progress = passed / Dashboard.scrollTime;
      shifts.scrollTop = Dashboard.scrollDistance * progress;
      if (shifts.scrollTop < fullHeight-viewHeight) {
        requestAnimationFrame(Dashboard.scroll);
      }else {
        console.log('Reached the bottom');
        setTimeout(Dashboard.resetScroll, 1500); // Pause at the bottom for a while.
        setTimeout(Dashboard.scroll, 500); // Then start scrolling.
      }
    } else {
      setTimeout(Dashboard.scroll, 500);
    }
  },
  resetScroll: function() {
    var shifts = Dashboard.mainPage.getPath('mainPane.shifts').get('layer');
    Dashboard.lastMouse = performance.now();
    shifts.scrollTop = 0;

  },

  _currentFontSize: 100,
  setFontSize: function(fontSize) {
    if (!fontSize) {
      fontSize = '100'; 
    }
    fontSize = parseInt(fontSize, 10);
    this._currentFontSize = fontSize;
    Dashboard.local.set('fontSize', fontSize);
  }

});
