var app = app || {};

var Story = Backbone.Collection.extend({

  // Reference to this collection's model.
  model: app.Paragraph,

  localStorage: new Backbone.LocalStorage('story-teller'),

  // We keep the Paragraphs in sequential order, despite being saved by unordered
  // GUID in the database. This generates the next order number for new paragraph.
  nextOrder: function() {
    if ( !this.length ) {
      return 1;
    }
    return this.last().get('order') + 1;
  },

  // Paragraphs are sorted by their original insertion order.
  comparator: function( paragraph ) {
                return paragraph.get('order');
              }
});

app.Story = new Story();
