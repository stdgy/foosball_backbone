var app = app || {};

app.GameEdit = Backbone.View.extend({
	tagName: 'div',

	template: _.template($('#game-edit-template').html()),

    saveTemplate: $('#game-save-template').html(),

	events: {
        'click .score-btn': 'score',
        'click .undo-btn': 'undo',
        'click .end-btn': 'endGame'
	},

	initialize: function(){
        app.collapseNav();
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

            var blue_score = _.chain(blue_position.scores)
                .filter(function(score){ return !score.own_goal; })
                .value()
                .length;

            positions.push({
                red_score: red_score,
                red_id: red_position.user.id,
                red_name: app.users.chain().where({ id: red_position.user.id }).first().value().get('name'),
                position: mapping.name,
                position_index: mapping.index,
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
                return _.map(p.player.scores, function(score){
                    return {
                        username: app.users.chain().where({ id: p.player.user.id }).first().value().get('name'),
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

        return m;
    },

	render: function(){
        var model = this.collectData();        

        this.$el.html( this.template({ data: model }) );
        
		return this;
	},

    score: function(event){
        var model = this.model;
        var $button = $(event.currentTarget);

        // Get team and position of player that scored
        var index = parseInt($button.data("position_index"), 10);
        var team_name = $button.data("team");

        // Get player on that team at that position
        var player = _.chain(model.get('teams'))
            .where({ name: team_name })
            .map(function(team){
                return team.players;
            })
            .flatten()
            .where({ position: index })
            .first()
            .value();

        // Add score
        player.scores.push({
            time: new Date()
        });
        
        // Re-render
        this.render();
    },

    // Removes the last score
    undo: function(){
        var model = this.model;

        // Find the latest score
        var last_score = _.chain(this.model.get('teams'))
            .map(function(team){
                // Get players with team
                return _.map(team.players, function(player){
                    return { team_name: team.name, player: player };
                })
            })
            .flatten()
            .map(function(p){
                // Get scores with player and team information
                return _.map(p.player.scores, function(score){
                    return { team_name: p.team_name, position: p.player.position, time: score.time, score: score, scores: p.player.scores };
                });
            })
            .flatten()
            .sortBy('time')
            .last()
            .value();

        if (last_score && last_score.scores){
            // Get index we'll want to remove
            var index = _.indexOf(last_score.scores, last_score.score);

            // Remove the score
            last_score.scores.pop(index);

            // Render page 
            this.render();
        }
    },

    endGame: function(){
        // Load save screen
        this.$el.html(this.saveTemplate);

        // Save model to server
        var jqxhr = this.model.save();

        jqxhr
            .done(function(data){
                // Saved successfully. Continue on to the post-game page.
            })
            .fail(function(jqxhr, textStatus){
                // Error occurred while saving. Display error.
            });

    }
});