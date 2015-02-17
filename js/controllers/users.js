var app = app || {};

app.UserCollection = Backbone.Collection.extend({
	model: app.UserModel,

	url: '/users'
});