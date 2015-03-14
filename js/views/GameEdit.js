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

    collectData: function(){
        // Collect data into object we can send to template
        var model = {
            red_score_count: 0,
            blue_score_count: 0,
            positions: [
                {   
                    position: 'Goalie',
                    red: {
                        id: 0,
                        score: 0,
                        name: 'Terry'
                    },
                    blue: {
                        id: 0,
                        score: 0,
                        name: 'Bob'
                    }
                }
            ],
            scores: [
                {
                    username: 'Ralph',
                    time: 0,
                    team: 'Red'
                }
            ]
        };

        // Get score count for each team
        var red_score_count = _.reduce(
            _.map(
                _.where(this.model.teams, { name: 'red' }).players, 
                    function(player){
                        return _.filter(player.scores, 
                            function(score){
                                // Return scores that are not own goals
                                return !score.own_goal;
                            });
                    }), function(scores, scores){
            return scores.concat(scores);
        }).length;

        var blue_score_count = _.reduce(
            _.map(
                _.where(this.model.teams, { name: 'blue' }).players, 
                    function(player){
                        return _.filter(player.scores, 
                            function(score){
                                // Return scores that are not own goals
                                return !score.own_goal;
                            });
                    }), function(scores, scores){
            return scores.concat(scores);
        }).length;

        var red_position = _.where(this.model.teams, { name: 'red' }).players;
    },

	render: function(){
        var model = this.collectData();        

        this.$el.html( this.template({ data: model }) );
        
		return this;
	},

    score: function(){
        // Add score

        // Re-render
    }
});