// ==========================================================================
// Project:   Dashboard - views/row
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals SC Dashboard */

/** @class

  @extends SC.View
  @extends SC.ContentDisplay
*/
Dashboard.SourceView = SC.View.extend( SC.ContentDisplay,
  /** @scope Dashboard.SourceView.prototype */ {

  tagName: 'li',
  useStaticLayout: true,
  classNames: 'source',
  
  displayProperties: 'isSelected',

  render: function(context, firstTime) {
    var content = this.get('content');

    context.push(content.get('name'));

    if (this.get('isSelected')) {
      context.addClass('sel');
    }
  }

});
