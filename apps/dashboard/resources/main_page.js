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
    childViews: 'shifts'.w(),
    
    shifts: Dashboard.ScrollView.design({
      layout: { top: 50, left: 50, right: 50, bottom: 50 },
      
      contentView: Dashboard.CollectionView.design({
        classNames: 'dashboard-table',
        
        contentBinding: 'Dashboard.shifts.arrangedObjects',
        
        exampleView: Dashboard.RowView
      })
    })
  })

});
