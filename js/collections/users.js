var app = app || {};

var UserCollection = Backbone.Collection.extend({
	model: app.UserModel,

	comparator: 'name',
	
	url: '/api/users'
});

app.users = new UserCollection();