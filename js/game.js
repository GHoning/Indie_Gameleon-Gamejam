/**
 *  The game contains the data and resources loaded.
 */
var game = {

	//global game data
	data : {
		currentLevel: constants.STARTING_LEVEL, 
		playerPos: constants.PLAYER_STARTLOCATION,
		deathCounter : 0,
		graves : []
	},
	
	/*
	 *	Checks if the user uses a html 5 compatible browser and if the user tries to use the debugger.
	 */
	onload : function () {
		if (!me.video.init("screen", constants.SCREENWIDTH, constants.SCREENHEIGHT, true, 'auto')) {
			alert("Your browser does not support HTML5 canvas.");
			return;
		}

		if (document.location.hash === "#debug") {
			window.onReady(function () {
				me.plugin.register.defer(debugPanel, "debug");
			});
		}

		me.audio.init("mp3,ogg");
		me.loader.onload = this.loaded.bind(this);
		me.loader.preload(game.resources);
		me.state.change(me.state.LOADING);
	},
	
	/*
	 *	Called when loading is finished. Creates all the screen objects en registers objects to their respective entity pool.
	 */
	loaded : function () {
		game.play = new game.PlayScreen(true, true);
		me.state.set(me.state.PLAY, game.play);
		
		me.pool.register("player", game.player);
		me.pool.register("grave", game.Grave);

		me.input.bindKey(me.input.KEY.W, "Left");
		me.input.bindKey(me.input.KEY.A, "Down");
		me.input.bindKey(me.input.KEY.S, "Right");
		me.input.bindKey(me.input.KEY.D, "Up");

		me.input.bindKey(me.input.KEY.UP, "Left");
		me.input.bindKey(me.input.KEY.LEFT, "Down");
		me.input.bindKey(me.input.KEY.DOWN, "Right");
		me.input.bindKey(me.input.KEY.RIGHT, "Up");
		
		me.input.bindKey(me.input.KEY.E, "Interact");
		me.input.bindKey(me.input.KEY.ENTER, "Interact");

		me.state.change(me.state.PLAY);
	}
};
