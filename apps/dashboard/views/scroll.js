// ==========================================================================
// Project:   Dashboard - views/scroll
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Dashboard */

/** @class
  An SC.ScrollView-compatible static scroll view that uses browser-native 
  scrollbars for MUCH faster performance. Requires the following CSS somewhere:
  
  {{{
    .scrollbars {
      overflow: auto;
    }
  }}}
  
  In addition, your `contentView` should have defined:
  
  {{{
    useStaticLayout: YES
  }}}
  
  in order for this view to function properly.
  
  @extends SC.View
*/

Dashboard.ScrollView = SC.View.extend(
  /** @scope Dashboard.ScrollView.prototype */ {

  classNames: ['scrollbars'],

  childViews: ['contentView']

});
