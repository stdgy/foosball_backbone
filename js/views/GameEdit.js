var app = app || {};

app.GameEdit = Backbone.View.extend({
	tagName: 'div',

	template: _.template($('#game-edit-template').html()),

	events: {
        '.score click': 'score'
	},

	initialize: function(){
        app.currentView = this;
        // Render the view
        this.$body = $("#body");
        this.$body.html(this.el);
        this.render();
	},

	render: function(){
        this.$el.html( this.template({ data: { users: this.collection } }) );
        
		return this;
	},

    score: function(){
        // Add score

        // Re-render
    }
});