// ==========================================================================
// Project:   Dashboard - views/collection
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Dashboard */

/** @class
  An SC.CollectionView-compatible static collection view that uses is designed 
  to be used with Dashboard.ScrollView for MUCH faster performance.
  
  You must define your exampleView with:
  
  {{{
    useStaticLayout: YES
  }}}
  
  in order for this class to function correctly.
  
  @extends SC.CollectionView
*/
Dashboard.CollectionView = SC.CollectionView.extend(
  /** @scope Dashboard.CollectionView.prototype */ {

  useStaticLayout: YES

});
