var UserModel = Backbone.Model.extend({
	defaults: {
		user: 'name',
		first_name: '',
		last_name: '',
		email: '',
		birthday: null
	}
});

var userModel = new UserModel({
	user: 'danny',
	first_name: 'Bob',
	last_name: 'Mahoney',
	email: 'Bob@Mahoneys.com',
	birthday: new Date("May 23, 1988")
});

var UserView = Backbone.View.extend({
	
	tagName: 'div',

	// Save template function
	userTpl: _.template( $("#user-template").html() ),

	events: {
		'keypress .user': 'updateUser',
		'keypress .first_name': 'updateFirstName',
		'keypress .last_name': 'updateLastName',
		'keypress .email': 'updateEmail',
		'keypress .birthday': 'updateBirthday'
	},

	initialize: function(){
		this.$el = $("#user");
		this.model.on('change', this.render, this);
	},

	render: function(){
		this.$el.html( this.userTpl( this.model.attributes ));
		return this;
	},

	updateUser: function(){

	},

	updateFirstName: function(e){
		console.log(e);
		// Set model value with silent passed in
	},

	updateLastName: function(){

	},

	updateEmail: function(){

	},

	updateBirthday: function(){

	}
});

var userView = new UserView({ model: userModel });