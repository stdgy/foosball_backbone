var app = app || {};

app.GameCreate = Backbone.View.extend({
	tagName: 'div',

	template: _.template($('#game-create-template').html()),

	events: {
        'submit': 'createGame'
	},

	initialize: function(){
        // Create game model we'll be creating 

        // Attach to the game model's request and sync event

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
                        position: '1',
                        user: {
                            id: this.$el.find('#team1-position1').val()
                        }
                    },
                    {
                        position: '2',
                        user: {
                            id: this.$el.find('#team1-position2').val()
                        }
                    },
                    {
                        position: '3',
                        user: {
                            id: this.$el.find('#team1-position3').val()
                        }
                    },
                    {
                        position: '4',
                        user: {
                            id: this.$el.find('#team1-position4').val()
                        }
                    }
                ]
            },
            {   
                name: this.$el.find('#team2-name').val(),
                players: [ 
                    {
                        position: '1',
                        user: {
                            id: this.$el.find('#team2-position1').val()
                        }
                    },
                    {
                        position: '2',
                        user: {
                            id: this.$el.find('#team2-position2').val()
                        }
                    },
                    {
                        position: '3',
                        user: {
                            id: this.$el.find('#team2-position3').val()
                        }
                    },
                    {
                        position: '4',
                        user: {
                            id: this.$el.find('#team2-position4').val()
                        }
                    }
                ]
            }
        ]);
        
        return game;
    },

    createGame: function(){
        // Create new game model with values from view
        var game = this.parseValues();

        // Save game
        game.save();

        // Forward on to game edit view
        app.FoosballRouter.navigate('users', { trigger: true });

        return false;
    }
});