var app = app || {};

app.AppView = Backbone.View.extend({

  el: '#storyteller',

  events: {
    'click #add-paragraph': 'createParagraph',
  },

  initialize: function() {
    this.$textarea       = this.$('#new-paragraph');
    this.$paragraphList  = this.$('#paragraph-list');
    this.$pictures       = this.$('#pictures');

    this.listenTo(app.Story, 'add',   this.addParagraph);
    this.listenTo(app.Story, 'reset', this.addAllParagraphs);
    this.listenTo(app.Story, 'all',   this.render);

    app.Story.fetch();
    this.displayPictures();
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
                  this.$paragraphList.append( view.render().el );
                },

  addAllParagraphs: function() {
                      this.$paragraphList.html('');
                      app.Story.each(this.addParagraph, this);
                    },

  newAttributes: function() {
                   return {
                     content: this.$textarea.val().trim(),
                     order:   app.Story.nextOrder()
                   }
                 },

  createParagraph: function( event ) {
                     if ( !this.$textarea.val().trim() ) {
                       return;
                     }
                     app.Story.create( this.newAttributes() );
                     this.$textarea.val('');
                     this.displayPictures();
                   },

  displayPicture:  function(picture) {
                     var view = new app.PictureView({ model: picture });
                     this.$pictures.append( view.render().el );
                   },

  displayPictures: function() {
                     this.$pictures.html('');
                     app.Pictures.reset();

                     that = this;
                     var tag1 = _.shuffle(["australia", "california", "europe", "france", "india", "japan"])[0];
                     var tag2 = _.shuffle(["nature", "character", "art", "city"])[0];
                     $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
                       {
                         tags:    ["beautiful", tag1, tag2].join(", "),
                         format:  "json",
                       },
                       function(data) {
                         for(i = 0; i < 9; i++) {
                           picture = new app.Picture({url: data.items[i].media.m});
                           app.Pictures.add(picture);
                         }
                         app.Pictures.each(that.displayPicture, that);
                       }
                    );
                   }
});
