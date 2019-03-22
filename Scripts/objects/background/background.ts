module objects {
    export class Background extends BitmapGameObject {

        public speed: number = 5;

        constructor() {
            super("forest", 1, config.Pivot.BOTTOMLEFT);
            let screen = managers.GameManager.Screen;

            this.SetScale((screen.Width / this.ActiveWidth));

            this.alpha = 1;
        }

        public Update(): void {
            this.SetPosition(this.Position.AddX(-this.speed));

            if (this.Position.x <= -this.ActiveWidth)
                this.SetPosition(managers.GameManager.Screen.BottomRight.AddY(-this.ActiveHalfHeight));
        }

        private Pause(): void {
            this.speed = 0;

            console.log(this.Position);
            console.log(this.ActiveWidth);
        }

    }
}