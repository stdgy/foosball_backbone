var app = app || {};

app.UserRow = Backbone.View.extend({
	tagName: 'table',

	template: null,

	events: {

	},

	initialize: function(){
        // Re-render table when collection changes
        app.users.on('change', this.render, this);
	},

	render: function(){
		return this;
	}
});