var app = app || {};

app.UserView = Backbone.View.extend({
	tagName: 'div',

	template: $("#user-list-template").html(),

	events: {

	},

	initialize: function(){
        this.$body = $("#body");
        this.$header = $("#header");
        this.userTable = new app.UserTable({ collection: app.users });
        this.$el.html(this.template);
        this.$container = this.$el.find('.user-container');
        this.render();
	},

	render: function(){
        this.$container.html(this.userTable.render().el);
        this.$body.html(this.el);
	}
});