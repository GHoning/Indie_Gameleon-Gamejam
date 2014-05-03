/**
 *  The games play screen. Used too handle level switches and inventory guffins
 */
game.PlayScreen = me.ScreenObject.extend({
		
		onResetEvent : function () {
			console.log("reset");
			me.levelDirector.loadLevel(game.data.currentLevel);
			this.HUD;
			this.addHUD();
			me.game.currentLevel.getLayerByName("bridgesAbove").alpha = 0;
			this.collisionMap = me.game.currentLevel.getLayerByName(constants.ISOCOLL_LAYER).layerData;
			this.placeGraves();
			me.game.currentLevel.getLayerByName(constants.ISOCOLL_LAYER).alpha = 0;
		},
		
		placeGraves : function () {
			for (var i = 0; i < game.data.graves.length; i++){
				var grave = new game.Grave(game.data.graves[i].x - 60 , game.data.graves[i].y - 120, {image: "Grave",spritewidth: 128, spriteheight:192});
				me.game.world.addChild(grave, 10000);
			}
			
			var grave = me.game.world.getChildByProp("image","Grave");
			console.log(grave);
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

		loadLevel : function (lvl) {
			me.levelDirector.loadLevel(lvl);
			
			this.collisionMap = me.game.currentLevel.getLayerByName(constants.ISOCOLL_LAYER).layerData;

			me.game.currentLevel.getLayerByName(constants.ISOCOLL_LAYER).alpha = 0;
			this.placeGraves();
		}
	});
