var app = app || {};

var UserCollection = Backbone.Collection.extend({
	model: app.UserModel,

	comparator: 'name',
	
	url: '/users'
});

app.users = new UserCollection();