var app = app || {};

// A game model will have two teams. Each team will have four players.
// And each player will have scores and a user reference.
app.GameModel = Backbone.Model.extend({
	validate: function(attrs, options){
		// Validation logic in here. 
		if (attrs.teams.length != 2){
			return "Must be two teams";
		}

		if (_.where(attrs.teams, { name: 'Red' }).length != 1){
			return "Must have a Red team";
		}

		if (_.where(attrs.teams, { name: 'Blue' }).length != 1){
			return "Must have a Blue team";
		}

		var red_team = _.chain(attrs.teams).where({ name: 'Red' }).first().value();
		var blue_team = _.chain(attrs.teams).where({ name: 'Blue' }).first().value();

		if (red_team.players.length != 4 || blue_team.players.length != 4){
			return "Each team must have 4 players";
		}

		var red_users = _.chain(red_team.players)
			.map(function(player){
				return player.user;
			})
			.flatten()
			.value();

		var blue_users = _.chain(blue_team.players)
			.map(function(player){
				return player.user;
			})
			.flatten()
			.value();

		var id_count = _.filter(red_users, function(user){ return !_.has(user, 'id') || !_.isNumber(user.id) }).length;

		id_count += _.filter(blue_users, function(user){ return !_.has(user, 'id') || !_.isNumber(user.id) }).length;

		if (id_count > 0){
			return "Each user must have an id";
		}

		var red_ids = _.chain(red_users)
			.map(function(user){
				return user.id;
			})
			.value();

		var blue_ids = _.chain(blue_users)
			.map(function(user){
				return user.id;
			})
			.value();

		if (_.intersection(red_ids, blue_ids).length != 0){
			return "Each team must have separate users";
		}
	}
});
