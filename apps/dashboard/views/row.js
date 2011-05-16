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
  contentDisplayProperties: 'dateAndTimeEntered siteName shiftDate shift employee employeeName'.w(),

  // rows should be (in order):
  // - Date and Time entered
  // - client
  // - client_name
  // - roster_date
  // - start_time
  // - finish_time
  // - employee
  // - employee_name
  render: function(context, firstTime) {
    var content = this.get('content'),
        keys = this.get('contentDisplayProperties'),
        idx, len, key;

    context.push(
      '<span class="dashboard-cell idx">',
      this.get('contentIndex') + 1, // 1-based
      '</span>'
    );
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

  _statusClasses: ['red', 'yellow', 'green'],

  transform: function(key, value) {
    switch (key) {
      case 'due':
        return value.slice(0,-11);
      default:
        return value;
    }
  }

});
