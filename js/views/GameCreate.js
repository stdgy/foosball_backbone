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

    },

    createGame: function(){
        // Create new game model with values from view

        // Save game

        // Forward on to list of users
        app.FoosballRouter.navigate('users', { trigger: true });

        return false;
    }
});