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

  // isContextMenuEnabled: NO,
  // 
  // contextMenu: function(evt) {
  //   var menuItems = [
  //     { title: 'Updated Client', target: Dashboard.statechart, action: 'updatedClient' }
  //   ];
  // 
  //   var menu = SC.MenuPane.create({
  //     layout: { width: 150 },
  //     items: menuItems
  //   }).popup(this);
  //   return sc_super();
  // },

  render: function(context, firstTime) {
    var content = this.get('content');

    context.push(content.get('name'));

    if (this.get('isSelected')) {
      context.addClass('sel');
    }
  }

});
