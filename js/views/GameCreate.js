var app = app || {};

app.GameCreate = Backbone.View.extend({
	tagName: 'div',

	template: _.template($('#game-create-template').html()),

	events: {
        'click .btn': 'createGame'
	},

	initialize: function(){
        app.collapseNav();
        // Create game model we'll be creating 

        // Attach to the game model's request and sync event

        app.currentView = this;

        // Render the view
        this.$body = $("#body");
        this.$body.html(this.el);
        this.render();
	},

	render: function(){
        this.$el.html( this.template({ data: { users: this.collection } }) );
        
		return this;
	},

    parseValues: function(){
        var game = new app.GameModel();

        game.set('teams', [
            {   
                name: this.$el.find('#team1-name').val(),
                players: [ 
                    {
                        position: 1,
                        user: {
                            id: parseInt(this.$el.find('#team1-position1').val(), 10)
                        },
                        scores: []
                    },
                    {
                        position: 2,
                        user: {
                            id: parseInt(this.$el.find('#team1-position2').val(), 10)
                        },
                        scores: []
                    },
                    {
                        position: 3,
                        user: {
                            id: parseInt(this.$el.find('#team1-position3').val(), 10)
                        },
                        scores: []
                    },
                    {
                        position: 4,
                        user: {
                            id: parseInt(this.$el.find('#team1-position4').val(), 10)
                        },
                        scores: []
                    }
                ]
            },
            {   
                name: this.$el.find('#team2-name').val(),
                players: [ 
                    {
                        position: 1,
                        user: {
                            id: parseInt(this.$el.find('#team2-position1').val(), 10)
                        },
                        scores: []
                    },
                    {
                        position: 2,
                        user: {
                            id: parseInt(this.$el.find('#team2-position2').val(), 10)
                        },
                        scores: []
                    },
                    {
                        position: 3,
                        user: {
                            id: parseInt(this.$el.find('#team2-position3').val(), 10)
                        },
                        scores: []
                    },
                    {
                        position: 4,
                        user: {
                            id: parseInt(this.$el.find('#team2-position4').val(), 10)
                        },
                        scores: []
                    }
                ]
            }
        ]);
        
        return game;
    },

    createGame: function(event){
        // Set button state
        var $btn = $(event.target);
        $btn.prop("disabled", true).text("Saving...");

        // Create new game model with values from view
        var game = this.parseValues();

        /*
        // Save game
        var jqxhr = game.save();

        if (jqxhr === false){
            // Validation failed.

        } else {
            // Validation succeeded. Go to the edit game screen.
            app.currentView && app.currentView.remove();
            app.currentView = new app.GameEdit({ model: game });
        }*/
        app.currentView && app.currentView.remove();
        app.currentView = new app.GameEdit({ model: game });

        return false;
    }
});