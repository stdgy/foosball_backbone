var app = app || {};

var FoosballRouter = Backbone.Router.extend({

	routes: {
		"users": "showUsers",

		"users/create": "createUser",

		"users/:id": "showUser",

		"games": "showGames",

		"games/create": "createGame",

		"games/:id": "showGame"
	},

	removeCurrentView: function(){
		app.currentView && app.currentView.remove();
	},

	showUsers: function(){
		// Remove current view and go to new view 
		this.removeCurrentView();
		app.userView = new app.UserView({ collection: app.users });
	},

	showUser: function(id){
		// Remove current view and go to new view 
		this.removeCurrentView();
		app.userEdit = new app.UserEdit({ model: _.first(app.users.where({ 'id': parseInt(id, 10) })) });
	},

	createUser: function(){
		// Remvoe curren tview and go to new view 
		this.removeCurrentView();
		new app.UserCreate({ model: new app.UserModel() });
	},

	showGames: function(){

	},

	showGame: function(id){

	},

	createGame: function(){
		// Remove current view and go to new view
		this.removeCurrentView();
		new app.GameCreate({ collection: app.users });
	}
});

app.FoosballRouter = new FoosballRouter();
Backbone.history.start();