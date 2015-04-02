var app = app || {};

app.UserModel = Backbone.Model.extend({
	urlRoot: 'http://api.std.gy/users',

	validate: function(attrs, options){
		// Validation logic in here. 
		if (attrs.name === undefined || $.trim(attrs.name) === ""){
			return "Each user must have a name";
		}

		var existingCount = _.chain(app.users.models)
			.filter(function(user){
				return user.get('name').toLowerCase() === attrs.name.toLowerCase() && user.get('id') != attrs.id;
			})
			.value()
			.length;

		if (existingCount > 0){
			return "Names must be unique between users";
		}
	}
});
