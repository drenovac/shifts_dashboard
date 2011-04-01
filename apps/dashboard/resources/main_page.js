// ==========================================================================
// Project:   Dashboard - mainPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals SC sc_super Dashboard */

// This page describes the main user interface for your application.  
Dashboard.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'appTitle sources shifts updated refresh'.w(),

    appTitle: SC.LabelView.design({
      layout: { top: 30, left: 160, height: 30 },
      tagName: 'div',
      layerId: 'title',
      value: 'Shifts Dashboard'
    }),

    sources: Dashboard.ScrollView.design({
      layout: { top: 60, width: 130, left: 10, bottom: 30 },

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

    shifts: Dashboard.ScrollView.design({
      layout: { top: 60, left: 150, right: 10, bottom: 30 },
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
      layout: { left: 160, bottom: 5, height: 20, right: 20 },

      valueBinding: SC.Binding.transform(function (value, binding) {
        return (value)
          ? "Grid updated at: " + SC.DateTime.create(value).toFormattedString('%d/%m/%y %H:%M:%S')+ ' ('+value+')'
          : "Fetching data for grid..." ;
      }).from('Dashboard.updatedAt')
    }),

    refresh: SC.ButtonView.design({
      layout: { width: 80, top: 30, height: 23, right: 10 },

      title: "Refresh",
      action: 'requestShifts',
      target: Dashboard
    })
  })

});
