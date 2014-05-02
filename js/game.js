/**
 *  The game contains the data and resources loaded.
 */
var game = {

	//global game data
	data : {
		currentLevel: constants.STARTING_LEVEL, 
		playerPos: constants.PLAYER_STARTLOCATION,
		currentQuestState : constants.STARTING_QUESTSTATE,
		lastSpokenPerson : "",
		inventory : [],
		questItems : [],
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
		game.play = new game.PlayScreen();
		me.state.set(me.state.PLAY, game.play);
		
		me.pool.register("player", game.player);

		me.input.bindKey(me.input.KEY.W, "Up");
		me.input.bindKey(me.input.KEY.A, "Left");
		me.input.bindKey(me.input.KEY.S, "Down");
		me.input.bindKey(me.input.KEY.D, "Right");

		me.input.bindKey(me.input.KEY.UP, "Up");
		me.input.bindKey(me.input.KEY.LEFT, "Left");
		me.input.bindKey(me.input.KEY.DOWN, "Down");
		me.input.bindKey(me.input.KEY.RIGHT, "Right");

		me.state.change(me.state.PLAY);
	}
};
