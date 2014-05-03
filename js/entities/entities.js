game.Grave = me.ObjectEntity.extend({
		init :  function (x, y, settings) {
			this.parent(x, y, settings);
			this.settings = settings;
			this.image = settings.image;
			this.height = settings.spriteheight;
			this.width = settings.spritewidth;
			this.gravity = false;
			this.collidable = true;
			console.log("place grave");
			console.log(this.pos.x+ " " +this.pos.y);
			console.log(this);
		},
		
		update : function () {
			console.log("landsharks");
			this.updateMovement();
			this.parent();
			return true;
		}
	});