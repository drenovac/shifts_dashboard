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
  // CSS class names are of the form: "dashboard-cell <key>" and are <spans>
  contentDisplayProperties: 'client roster start finish callTaken employee source'.w(),

  render: function(context, firstTime) {
    var content = this.get('content'),
        keys = this.get('contentDisplayProperties'),
        idx, len, key;

    for (idx=0, len=keys.length; idx<len; ++idx) {
      key = keys[idx];
      context.push(
        '<span class="dashboard-cell ', key, '">',
        this.transform(key, content.get(key)),
        '</span>'
      );
    }
    
    context.addClass(this._statusClasses[content.get('status')]);
  },

  _statusClasses: ['green', 'yellow', 'orange', 'red'],

  transform: function(key, value) {
    switch (key) {
      case 'roster':
      case 'start':
      case 'finish':
      case 'callTaken':
        return SC.DateTime.create(value).toFormattedString('%H:%M');
      default:
        return value;
    }
  }

});
