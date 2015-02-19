var app = app || {};

var FoosballRouter = Backbone.Router.extend({

	routes: {
		"users": "showUsers",

		"users/:id": "showUser",

		"users/create": "createUser",

		"games": "showGames",

		"games/:id": "showGame",

		"games/create": "createGame"
	},

	showUsers: function(){

	},

	showUser: function(id){

	},

	createUser: function(){

	},

	showGames: function(){

	},

	showGame: function(id){

	},

	createGame: function(){

	}
});

app.FoosballRouter = new FoosballRouter();
Backbone.history.start();