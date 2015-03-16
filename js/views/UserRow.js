var app = app || {};

app.UserRow = Backbone.View.extend({
    tagName: 'tr',

    template: _.template($("#user-row-template").html()),

    events: {

    },

    initialize: function(){

    },

    render: function(){
        this.$el.html(this.template({ data: this.model.attributes }));
        return this;
    }
});