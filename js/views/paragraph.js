var app = app || {};

app.ParagraphView = Backbone.View.extend({
  tagName: 'li',

  template: _.template( $('#paragraph-template').html() ),

  events: {
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

  close: function() {
    var value = this.$textarea.val().trim();

    if ( value ) {
      this.model.save({ content: value });
    } else {
      this.clear();
    }
  },

  clear: function() {
    this.model.destroy();
  }
});
