/**
 *  The games play screen. Used too handle level switches and inventory guffins
 */
game.PlayScreen = me.ScreenObject.extend({
		
		onResetEvent : function () {
			me.levelDirector.loadLevel(game.data.currentLevel);
			game.data.score = 0;
			//this.HUD;
			//this.addHUD();
			this.placePlayer(game.data.playerPos);
			me.game.currentLevel.getLayerByName(constants.ISOCOLL_LAYER).alpha = 0;
			this.collisionMap = me.game.currentLevel.getLayerByName(constants.ISOCOLL_LAYER).layerData;
			console.log(me.game.currentLevel.getLayerByName(constants.ISOCOLL_LAYER));
			console.log("mapWidth = " + me.game.currentLevel.getLayerByName(constants.ISOCOLL_LAYER).rows * me.game.currentLevel.getLayerByName(constants.ISOCOLL_LAYER).tilewidth);
			console.log("mapHeight = " + me.game.currentLevel.getLayerByName(constants.ISOCOLL_LAYER).cols * me.game.currentLevel.getLayerByName(constants.ISOCOLL_LAYER).tileheight);
			this.placePlayer(new me.Vector2d((me.game.currentLevel.getLayerByName(constants.ISOCOLL_LAYER).rows * me.game.currentLevel.getLayerByName(constants.ISOCOLL_LAYER).tilewidth/2 -64),-128));
		},
		
		addHUD :  function () {
			this.HUD = new game.HUD.Container();
			me.game.world.addChild(this.HUD);
		},
		
		placePlayer : function (pos) {
			var player = me.game.world.getChildByName("player");
			player[0].pos.x = pos.x;
			player[0].pos.y = pos.y;
		},
		
		onDestroyEvent : function () {
			var player = me.game.world.getChildByName("player");
			
			game.data.playerPos = new me.Vector2d(player[0].pos.x, player[0].pos.y);
			me.game.world.removeChild(me.game.world.getChildByName("HUD")[0]);
		},

		loadLevel : function (settings) {
			this.settings = settings;
			me.game.viewport.fadeIn(settings.fade, settings.duration);
			var previousLevel = me.levelDirector.getCurrentLevelId();
			me.levelDirector.loadLevel(settings.to);

			var spawnList = me.game.getEntityByName("Spawnpoint");
			var player = me.game.getEntityByName("playerObject");
			var spawn;

			for (var i = 0; i < spawnList.length; i++) {
				spawn = spawnList[i];
				if (spawn.from == previousLevel) {
					this.placePlayer(spawn.pos.x, spawn.pos.y);
				}
			}

			me.game.viewport.fadeOut(settings.fade, settings.duration);

			this.checkQuestItems();
			this.checkItems();
			game.data.drawText = "";
		}
	});
