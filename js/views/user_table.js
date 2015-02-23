var app = app || {};

app.UserTable = Backbone.View.extend({
	tagName: 'table',

    className: 'table table-striped',

	template: null,

	events: {

	},

	initialize: function(){
        // Re-render table when collection changes
        this.listenTo(app.users, 'add', this.render);
	},

	render: function(){
        // Remove existing rows
        this.$el.html('');
        // Add new rows
        app.users.each(function(user){
            var rowView = new app.UserRow({ model: user });
            this.$el.append( rowView.render().el );
        }, this);

		return this;
	}
});