var app = app || {};

// A game model will have two teams. Each team will have four players.
// And each player will have scores and a user reference.
app.GameModel = Backbone.Model.extend({
	validate: function(attrs, options){
		// Validation logic in here. 
	}
});
