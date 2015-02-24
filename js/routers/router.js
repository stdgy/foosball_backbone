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

	removeCurrentView: function(){
		app.currentView && app.currentView.remove();
	},

	showUsers: function(){
		// Remove current view and go to new view 
		this.removeCurrentView();
		app.userView = new app.UserView();
	},

	showUser: function(id){
		// Remove current view and go to new view 
		this.removeCurrentView();
		app.userEdit = new app.UserEdit({ model: _.first(app.users.where({ 'id': parseInt(id, 10) })) });
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