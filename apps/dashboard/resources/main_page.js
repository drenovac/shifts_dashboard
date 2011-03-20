// ==========================================================================
// Project:   Dashboard - mainPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals SC Dashboard */

// This page describes the main user interface for your application.  
Dashboard.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'shifts updated'.w(),

    shifts: Dashboard.ScrollView.design({
      layout: { top: 80, left: 10, right: 10, bottom: 40 },
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
      layout: { left: 20, bottom: 10, height: 20, right: 20 },

      valueBinding: SC.Binding.transform(function (value, binding) {
        return "Grid updated at: " + SC.DateTime.create(value).toString();
      }).from('Dashboard.updatedAt')
    })
  })

});
