var app = app || {};

app.UserEdit = Backbone.View.extend({
	tagName: 'div',

	template: _.template($('#user-edit-template').html()),

	events: {
        'submit': 'saveValues'
	},

	initialize: function(){
        // Re-render table when collection changes
        //this.listenTo(this.model, 'change', this.render);
        this.$body = $("#body");
        this.$body.html(this.el);
        this.render();
	},

	render: function(){
        if (this.model){
            this.$el.html( this.template({ data: this.model.attributes }) );
        } else {
            this.$el.html( this.template({ data: {} }) );
        }
		return this;
	},

    saveValue: function(){
        var values = {
            name: this.$el.find('.name').val(),
            first_name: this.$el.find('first-name').val(),
            last_name: this.$el.find('last-name').val(),
            email: this.$el.find('email').val(),
            birthday: this.$el.find('birthday').val()
        };

        // Update model with new values
        this.model.set(values);
    }
});