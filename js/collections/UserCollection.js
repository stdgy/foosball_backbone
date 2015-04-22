var app = app || {};

var UserCollection = Backbone.PageableCollection.extend({
	model: app.UserModel,

	comparator: 'name',
	
	url: 'http://api.std.gy/users'
});

app.users = new UserCollection();