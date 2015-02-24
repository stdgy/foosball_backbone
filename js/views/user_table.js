var app = app || {};

app.UserTable = Backbone.View.extend({
	tagName: 'table',

    className: 'table table-striped',

	template: $('#user-table-template').html(),

	events: {

	},

	initialize: function(){
        // Re-render table when collection changes
        this.listenTo(app.users, 'add', this.render);
        this.$el.html(this.template);
        this.$tbody = this.$el.find('tbody');
	},

	render: function(){
        // Remove existing rows
        this.$tbody.html('');
        // Add new rows
        app.users.each(function(user){
            var rowView = new app.UserRow({ model: user });
            this.$tbody.append( rowView.render().el );
        }, this);

		return this;
	}
});