class Controllers {
    constructor(x, y, spriteName, group, target, configs) {
        this.sprite = group.create(x, y, 'assets', spriteName);
        this.sprite.width /= 2;
        this.sprite.height /= 2;
        this.sprite.anchor.setTo(0.5, 0.5);
        let radius = (this.sprite.width + this.sprite.height) / 5;
        this.sprite.body.setCircle(radius, this.sprite.width / 3 * 2, this.sprite.height / 3 * 2);
        this.velocity = new Phaser.Point(0, 0);
        // this.sprite.body.collideWorldBounds = true;

        this.configs = configs;
        this.target = target;
    }

    update(shift) {
        var direction = new Phaser.Point(
            this.target.x - this.sprite.x,
            this.target.y - this.sprite.y
        );

        var currentAngle = Nakama.game.math.radToDeg(
            Nakama.game.math.angleBetween(
                0, 0,
                this.velocity.x, this.velocity.y
            )
        );

        var directionAngle = Nakama.game.math.radToDeg(
            Nakama.game.math.angleBetween(
                0, 0,
                direction.x, direction.y
            )
        );

        var delta = directionAngle - currentAngle;

        if(delta > 180) delta -= 360;
        if(delta < -180) delta += 360;

        var maxDelta = this.configs.turnRate * Nakama.game.time.physicsElapsed;
        if(delta > maxDelta) delta = maxDelta;
        if(delta < -maxDelta) delta = -maxDelta;

        var newAngle = currentAngle + delta;
        var newDirection = new Phaser.Point(
            Math.cos(Nakama.game.math.degToRad(newAngle)),
            Math.sin(Nakama.game.math.degToRad(newAngle))
        );

        this.velocity = newDirection.setMagnitude(this.configs.speed);
        this.sprite.angle = Math.atan2(newDirection.x, -newDirection.y) * (180 / Math.PI);

        this.sprite.x += this.velocity.x;
        this.sprite.y += this.velocity.y;

        if (shift != null) {
            this.sprite.x += shift.x;
            this.sprite.y += shift.y;
        }
    }
}
