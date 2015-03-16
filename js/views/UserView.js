var app = app || {};

app.UserView = Backbone.View.extend({
	tagName: 'div',

	template: $("#user-list-template").html(),

	events: {

	},

	initialize: function(){
        app.collapseNav();
    	// Set current application view to this object 
    	app.currentView = this;

        this.$body = $("#body");
        this.$header = $("#header");
        this.userTable = new app.UserTable({ collection: app.users });
        this.$el.html(this.template);
        this.$container = this.$el.find('.user-container');
        // Populate the user collection with some fake data 
        app.users.add([
        	{ id: 1, name: 'Danny', first_name: 'Danny', last_name: 'Mathis', birthday: '1988-05-25', email: 'test@b.com'},
        	{ id: 2, name: 'Stephanie', first_name: 'Stephanie', last_name: 'Nunez', birthday: '1991-08-02', email: 'test@b.com'},
        	{ id: 3, name: 'Marvin', first_name: 'Marvin', last_name: 'Mathers', birthday: '1985-03-02', email: 'test@b.com'},
        	{ id: 4, name: 'Polasky', first_name: 'Polasky', last_name: 'Putnam', birthday: '1992-06-03', email: 'test@b.com'},
        	{ id: 5, name: 'Jenny', first_name: 'Jenny', last_name: 'Block', birthday: '1999-08-24', email: 'test@b.com'},
        	{ id: 6, name: 'Susan', first_name: 'Susan', last_name: 'Boyle', birthday: '1987-10-30', email: 'test@b.com'},]);
        this.render();
	},

	render: function(){
        this.$container.html(this.userTable.render().el);
        this.$body.html(this.el);
	}
});