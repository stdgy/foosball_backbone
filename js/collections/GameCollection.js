var app = app || {};

var GameCollection = Backbone.PageableCollection.extend({
	model: app.GameModel,

	comparator: 'name',
	
	url: 'http://api.std.gy/games'
});