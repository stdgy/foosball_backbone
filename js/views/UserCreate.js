var app = app || {};

app.UserCreate = Backbone.View.extend({
	tagName: 'div',

	template: _.template($('#user-edit-template').html()),

	events: {
        'submit': 'createUser'
	},

	initialize: function(){
        app.collapseNav();
        // Re-render table when collection changes
        //this.listenTo(this.model, 'change', this.render);
        app.currentView = this;
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

    createUser: function(){
        // Collect values from view
        var values = {
            name: this.$el.find('.name').val(),
            first_name: this.$el.find('.first-name').val(),
            last_name: this.$el.find('.last-name').val(),
            email: this.$el.find('.email').val(),
            birthday: this.$el.find('.birthday').val()
        };

        // Update model with new values
        this.model.set(values);

        if (this.model.isValid() === false){
            var $error = this.$el.find("#error")
            $error
                .find(".text").text(this.model.validationError).end()
                .removeClass("hidden")
                .addClass("show");
                
            return false;
        }

        // Disable button and show loading

        // Save model to server
        var jqxhr = this.model.save();

        jqxhr
            .done(function(data){
                // Succcessfully saved. Go back to user list.
                // Add model to collection
                app.users.add(this.model);

                // Forward on to list of users
                app.FoosballRouter.navigate('users', { trigger: true });

            })
            .fail(function(jqxhr, textStatus){
                // Error occurred. Report it.
                var $error = this.$el.find("#error")
                $error
                    .find(".text").text(jqxhr.responseText).end()
                    .removeClass("hidden")
                    .addClass("show");
            });

        return false;
    }
});