module objects {
    export class BeeSting extends BitmapGameObject {

        private speed: number = 150;

        constructor() {
            super("sting", 0.5, config.Pivot.TOPCENTER);

            this.rotation = -25;
        }

        public Update(): void {
            this.x += this.speed * Math.cos(30);
            this.y += this.speed * Math.cos(30);
        }
    }
}