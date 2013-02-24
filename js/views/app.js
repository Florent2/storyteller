var app = app || {};

app.AppView = Backbone.View.extend({

  el: '#storyteller',

  events: {
    'keypress #new-paragraph': 'createOnEnter',
  },

  initialize: function() {
    this.$input = this.$('#new-paragraph');
    this.$paragraphList  = this.$('#paragraph-list');

    this.listenTo(app.Story, 'add',   this.addParagraph);
    this.listenTo(app.Story, 'reset', this.addAllParagraphs);
    this.listenTo(app.Story, 'all',   this.render);

    app.Story.fetch();
  },

  render: function() {
            if(app.Story.length) {
              this.$paragraphList.show();
            } else {
              this.$paragraphList.hide();
            }
          },

  addParagraph: function( paragraph ) {
                  var view = new app.ParagraphView({ model: paragraph });
                  $('#paragraph-list').append( view.render().el );
                },

  addAllParagraphs: function() {
                      this.$('#paragraph-list').html('');
                      app.Story.each(this.addParagraph, this);
                    },

  newAttributes: function() {
                   return {
                     content: this.$input.val().trim(),
                     order:   app.Story.nextOrder()
                   }
                 },

  createOnEnter: function( event ) {
                   if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
                     return;
                   }
                   app.Story.create( this.newAttributes() );
                   this.$input.val('');
                 },
});
