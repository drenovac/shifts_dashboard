// ==========================================================================
// Project:   Dashboard - views/row
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals SC Dashboard */

/** @class

  @extends SC.View
  @extends SC.ContentDisplay
*/
Dashboard.RowView = SC.View.extend( SC.ContentDisplay,
  /** @scope Dashboard.RowView.prototype */ {

  tagName: 'span',
  classNames: 'dashboard-row',
  useStaticLayout: true,

  contentDisplayProperties: 'client'.w(),

  render: function(context, firstTime) {
    var content = this.get('content');

    context.push(content.get('client'), '<br>');
  }

});
