var app = app || {};

app.UserView = Backbone.View.extend({
	tagName: 'div',

	template: $("#user-list-template").html(),

	events: {

	},

	initialize: function(){
		// Set current application view to this object 
		app.currentView = this;

        this.$body = $("#body");
        this.$header = $("#header");
        this.userTable = new app.UserTable({ collection: app.users });
        this.$el.html(this.template);
        this.$container = this.$el.find('.user-container');
        // Populate the user collection with some fake data 
        app.users.add([
        	{ id: 1, name: 'Danny', first_name: 'Danny', last_name: 'Mathis', birthday: '05/25/1988', email: 'test@b.com'},
        	{ id: 2, name: 'Stephanie', first_name: 'Stephanie', last_name: 'Nunez', birthday: '01/20/1991', email: 'test@b.com'},
        	{ id: 3, name: 'Marvin', first_name: 'Marvin', last_name: 'Mathers', birthday: '03/02/1985', email: 'test@b.com'},
        	{ id: 4, name: 'Polasky', first_name: 'Polasky', last_name: 'Putnam', birthday: '06/03/1992', email: 'test@b.com'},
        	{ id: 5, name: 'Jenny', first_name: 'Jenny', last_name: 'Block', birthday: '08/24/1999', email: 'test@b.com'},
        	{ id: 6, name: 'Susan', first_name: 'Susan', last_name: 'Boyle', birthday: '10/30/1987', email: 'test@b.com'},]);
        this.render();
	},

	render: function(){
        this.$container.html(this.userTable.render().el);
        this.$body.html(this.el);
	}
});