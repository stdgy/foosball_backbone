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
        this.$body.append(this.$el);
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

    }
});