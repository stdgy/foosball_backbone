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
        var model = this.model;
        
        // Get score count for each team
        var red_score_count = _.chain(model.get('teams'))
            .where({ name: 'Red' })
            .map(function(team){
                return team.players;
            })
            .flatten()
            .map(function(player){
                return player.scores;
            })
            .flatten()
            .filter(function(score){
                return !score.own_goal;
            })
            .value()
            .length;

        var blue_score_count = _.chain(model.get('teams'))
            .where({ name: 'Blue' })
            .map(function(team){
                return team.players;
            })
            .flatten()
            .map(function(player){
                return player.scores;
            })
            .flatten()
            .filter(function(score){
                return !score.own_goal;
            })
            .value()
            .length;

        // Mapping used to retrieve position and score information
        var position_maps = [
            { name: 'Goalie', index: 1 },
            { name: 'Defender', index: 2 },
            { name: 'Center', index: 3 },
            { name: 'Striker', index: 4 }
        ];

        // Get position and score information
        var positions = [];
        _.each(position_maps, function(mapping){
            var red_position = _.chain(model.get('teams'))
                .where({ name: 'Red' })
                .map(function(team){
                    return team.players;
                })
                .flatten()
                .where({ position: mapping.index })
                .first()
                .value();

            var red_score = _.chain(red_position.scores)
                .filter(function(score){ return !score.own_goal; })
                .value()
                .length;

            var blue_position = _.chain(model.get('teams'))
                .where({ name: 'Blue' })
                .map(function(team){
                    return team.players;
                })
                .flatten()
                .where({ position: mapping.index })
                .first()
                .value();

            var blue_score = _.chain(red_position.scores)
                .filter(function(score){ return !score.own_goal; })
                .value()
                .length;

            positions.push({
                red_score: red_score,
                red_id: red_position.user.id,
                red_name: app.users.chain().where({ id: red_position.user.id }).first().value().get('name'),
                position: mapping.name,
                blue_name: app.users.chain().where({ id: blue_position.user.id }).first().value().get('name'),
                blue_id: blue_position.user.id,
                blue_score: blue_score
            });
        });

        // Get list of scores
        var scores = _.chain(model.get('teams'))
            .map(function(team){
                // Return array of players. Add team to each player.
                return _.map(team.players, function(player){
                    return {
                        team: team.name,
                        player: player
                    };
                });
            })
            .flatten()
            .map(function(p){
                // Return array of scores
                return _.map(p.scores, function(score){
                    return {
                        username: p.player.user.name,
                        time: score.time,
                        team: p.team
                    };
                });
            })
            .flatten()
            .sortBy("time")
            .value();

        // Return object organized in format template can parse
        var m = {
            red_score_count: red_score_count,
            blue_score_count: blue_score_count,
            positions: positions,
            scores: scores
        };

        console.log(m);

        return m;
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