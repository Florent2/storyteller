var app = app || {};

app.PictureView = Backbone.View.extend({
  tagName: 'li',

  template: _.template( $('#picture-template').html() ),

  render: function() {
    var html = this.template( this.model.toJSON() );
    this.$el.html(html);
    return this;
  },

  clear: function() {
    this.model.destroy();
  }
});
