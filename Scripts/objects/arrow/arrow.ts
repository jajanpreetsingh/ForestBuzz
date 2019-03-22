module objects {
    export class Arrow extends objects.BitmapGameObject {

        public move: boolean = false;

        private velocity: math.Vec2;

        constructor(imageString: string, vel: math.Vec2, scale: number = 1) {

            super(imageString, scale, config.Pivot.MIDCENTER);

            this.recalRegex = false;

            this.velocity = vel;

            this.move = true;

            this.Tag = config.Tags.Arrow;

            this.Start();
        }

        public Start(): void {
        }

        public Update(): void {
            if (this.move) {
                this.y += this.velocity.y;
                this.x -= this.velocity.x;

                //this.velocity = new math.Vec2(this.velocity.x, this.velocity.y + 4);
            }
        }

    }
}