// ==========================================================================
// Project:   Dashboard - mainPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals SC sc_super Dashboard */

// This page describes the main user interface for your application.  
Dashboard.mainPage = SC.Page.design({

  // Outlets
  shifts: SC.outlet('mainPane.shifts.contentView'),

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    defaultResponder: 'Dashboard.statechart',
    childViews: 'appTitle weekly sources shifts shiftsHeader updated dates refresh zoom currentSource speed speedDisplay'.w(),

    appTitle: SC.LabelView.design({
      layout: { top: 5, left: 160, height: 30 },
      tagName: 'div',
      layerId: 'title',
      value: 'Shifts Dashboard'
    }),

    weekly: SC.LabelView.design({
      layout: { top: 8, left: 420, right: 5, height: 30 },
      valueBinding: "Dashboard.sources.weeklyShiftsString",
      layerId: 'weekly-shifts',
      textAlign: SC.ALIGN_CENTER,
      escapeHTML: false
    }),

    sources: Dashboard.ScrollView.design({
      layout: { top: 35, width: 130, left: 10, bottom: 30 },

      contentView: Dashboard.CollectionView.design({
        tagName: 'ul',
        layerId: 'sources',

        contentBinding: 'Dashboard.sources.arrangedObjects',
        selectionBinding: 'Dashboard.sources.selection',

        useToggleSelection: true,

        // Kind of a hack, but the new selection isn't actually available
        // until after mouseUp is called, so assume that every mouseUp is
        // somehow changing the selection.
        mouseUp: function (evt) {
          this.invokeLater(function() {
            Dashboard.statechart.invokeStateMethod('changeSource');
          },0);
          return sc_super();
        },

        exampleView: Dashboard.SourceView
      })
    }),

    currentSource: SC.LabelView.design({
      layout: { left: 10, bottom: 5, height: 20, width: 120 },
      valueBinding: 'Dashboard.sources*selection.firstObject.name'
    }),

    shiftsHeader: Dashboard.ScrollView.design({
      layout: { top: 35, left: 150, right: 10, height: 25 },
      layerId: 'no-scroll',
      classNames: 'borders',

      contentView: Dashboard.CollectionView.design({
        classNames: 'dashboard-table',

        contentBinding: 'Dashboard.shifts.arrangedObjects',

        exampleView: Dashboard.RowView,

        render: function(context, firstTime) {
          if (firstTime) {
            var keys = Dashboard.RowView.prototype.contentDisplayProperties.copy(),
                idx, len, key;

            keys.unshift('#'); // contentIndex

            context.push(
              '<div class="dashboard-header-group">',
              '<div class="dashboard-row">'
            );
            for (idx=0, len=keys.length; idx<len; ++idx) {
              key = keys[idx];
              if (key === 'dateAndTimeEntered') key = "Date/Time Actioned"; // HACK
              context.push(
                '<span class="dashboard-cell">', key.replace(SC.STRING_DECAMELIZE_REGEXP,'$1 $2').capitalize(), '</span>'
              );
            }
            context.push('</div></div>');
            sc_super();
          } else {
            sc_super();
          }
        }
      })
    }),

    shifts: Dashboard.ScrollView.design({
      layout: { top: 35, left: 150, right: 10, bottom: 30 },
      classNames: 'borders',

      mouseMoved: function() {
        // console.log("mouseMove");
        Dashboard.lastMouse = performance.now();
      },

      contentView: Dashboard.CollectionView.design({
        classNames: 'dashboard-table',

        contentBinding: 'Dashboard.shifts.arrangedObjects',

        exampleView: Dashboard.RowView,

        render: function(context, firstTime) {
          if (firstTime) {
            var keys = Dashboard.RowView.prototype.contentDisplayProperties.copy(),
                idx, len, key;
        
            keys.unshift('#'); // contentIndex
        
            context.push(
              '<div class="dashboard-header-group" style="visibility: hidden">',
              '<div class="dashboard-row">'
            );
            for (idx=0, len=keys.length; idx<len; ++idx) {
              key = keys[idx];
              if (key === 'dateAndTimeEntered') key = "Date/Time Actioned"; // HACK
              context.push(
                '<span class="dashboard-cell">', key.replace(SC.STRING_DECAMELIZE_REGEXP,'$1 $2').capitalize(), '</span>'
              );
            }
            context.push('</div></div>');
            sc_super();
          } else {
            sc_super();
          }
        }
      })
    }),

    updated: SC.LabelView.design({
      layout: { left: 160, bottom: 5, height: 20, width: 250 },

      valueBinding: SC.Binding.transform(function (value, binding) {
        return (value)
          ? "Grid updated at: " + SC.DateTime.create(value).toFormattedString('%d/%m/%y %H:%M:%S')
          : "Fetching data for grid..." ;
      }).from('Dashboard.updatedAt')
    }),

    dates: SC.SegmentedView.extend({
      layout: { width: 300, height: 24, right: 520, bottom: 5 },
      itemTitleKey: 'title',
      itemValueKey: 'value',
      items: [
        { title:'All', value: 0},
        { title: 'Today', value: 1},
        { title: '2 Days', value: 2},
        { title: '4 Days', value: 4},
        { title: '7 Days', value: 7 }
      ],
      valueBinding: 'Dashboard.viewDates'
    }),

    refresh: SC.ButtonView.design({
      layout: { width: 80, bottom: 5, height: 23, right: 10 },

      title: "Refresh",
      action: 'requestShifts',
      target: Dashboard
    }),

    zoom: SC.ButtonView.design({
      layout: { width: 80, bottom: 5, height: 23, right: 100 },

      title: "Zoom",
      action: 'zoomView'
    }),

    speed: SC.SliderView.extend({
      layout: { width: 250, height: 18, bottom: 5, right: 250 },
      displayValue: "Speed",
      valueBinding: 'Dashboard.scrollTime',
      minimum: 5000,
      maximum: 40000,
      step: 1000
    }),
    speedDisplay: SC.LabelView.design({
      layout: {width: 40, height: 18, bottom: 5, right: 200 },
      valueBinding: SC.Binding.oneWay('Dashboard.scrollTime').transform(function(value) {
        return value/1000
      })
    }),

    bigger: SC.ButtonView.design({
      layout: { width: 80, bottom: 5, height: 23, right: 300 },

      title: "+",
      action: 'bigger'
    }),
    smaller: SC.ButtonView.design({
      layout: { width: 80, bottom: 5, height: 23, right: 200 },

      title: "-",
      action: 'smaller'
    })
  })

});
