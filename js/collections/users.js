var app = app || {};

var UserCollection = Backbone.Collection.extend({
	model: app.UserModel,

	url: '/users'
});

app.users = new UserCollection();