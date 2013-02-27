var app = app || {};

app.ParagraphView = Backbone.View.extend({
  tagName: 'li',

  template: _.template( $('#paragraph-template').html() ),

  events: {
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur     .edit': 'close',
    'click .destroy': 'clear'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },

  render: function() {
    var html = this.template( this.model.toJSON() );
    this.$el.html(html);
    this.$textarea = this.$('.edit');
    return this;
  },

  edit: function() {
    this.$el.addClass('editing');
    this.$textarea.focus();
  },

  close: function() {
    var value = this.$textarea.val().trim();

    if ( value ) {
      this.model.save({ content: value });
    } else {
      this.clear();
    }

    this.$el.removeClass('editing');
  },

  updateOnEnter: function( e ) {
    if ( e.which === ENTER_KEY ) {
      this.close();
    }
  },

  clear: function() {
    this.model.destroy();
  }
});
