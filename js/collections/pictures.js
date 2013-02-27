var app = app || {};

var Pictures = Backbone.Collection.extend({
  model: app.Picture,
});

app.Pictures = new Pictures();
