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

  tagName: 'div',
  classNames: 'dashboard-row',
  useStaticLayout: true,

  // place these keys in the order you want them displayed in the rows
  // CSS class names are of the form: <key>-cell and are <spans>
  contentDisplayProperties: 'client roster start finish callTaken employee source'.w(),

  render: function(context, firstTime) {
    var content = this.get('content'),
        keys = this.get('contentDisplayProperties'),
        idx, len, key;

    for (idx=0, len=keys.length; idx<len; ++idx) {
      key = keys[idx];
      context.push(
        '<span class="', key, '-cell">', content.get(key), '</span>'
      );
    }

    // add a break after the cells
    context.push('<br>');
  }

});
