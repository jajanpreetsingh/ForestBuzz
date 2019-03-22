module scenes {
    export class OverScene extends scenes.Scene {

        private bg: objects.Background;

        private startButton: objects.ContainerBitmapGameObject;
        private exitToMenuButton: objects.ContainerBitmapGameObject;
        private exitButton: objects.ContainerBitmapGameObject;

        constructor() {
            super();

            this.Init();
        }

        public Init(): void {
            this.sceneState = config.Scene.OVER;

            managers.GameManager.CurrentState = this.sceneState;
            managers.GameManager.CurrentScene = this;
            this.Start();
        }

        public Start(): void {

            this.bg = new objects.Background();
            this.addChild(this.bg);
            this.bg.alpha - 0.75;

            this.bg.SetPosition(managers.GameManager.Screen.BottomLeft.AddY(-this.bg.ActiveHalfHeight));
            this.InitStartButton();

            this.Main();
        }

        public InitStartButton(): void {

            this.startButton = new objects.ContainerBitmapGameObject("amberNormal", 2, config.Pivot.MIDCENTER);
            this.startButton.recalRegex = false;
            this.startButton.SetScale(2);
            this.addChild(this.startButton);
            this.startButton.SetPosition(managers.GameManager.Screen.Center);

            let label = new objects.Label("Play Again", "30px", "Acme", utility.Colors.WHITE);

            label.x = -this.startButton.MainImage.ActiveHalfWidth * 0.6;
            label.y = -this.startButton.MainImage.ActiveHalfHeight * 0.5;

            this.startButton.addChild(label);

            this.startButton.addEventListener("mouseover", () => {
                this.startButton.MainImage.image = new objects.BitmapGameObject("amberDark", 2, config.Pivot.MIDCENTER).image;
            });

            this.startButton.addEventListener("mouseout", () => {
                this.startButton.MainImage.image = new objects.BitmapGameObject("amberNormal", 2, config.Pivot.MIDCENTER).image;
            });

            this.startButton.addEventListener("click", () => { managers.GameManager.CurrentState = config.Scene.GAMEPLAY; });;

            this.InitInstructionButton();
        }

        public InitInstructionButton(): void {

            this.exitToMenuButton = new objects.ContainerBitmapGameObject("amberNormal", 2, config.Pivot.MIDCENTER);
            this.exitToMenuButton.recalRegex = false;
            this.exitToMenuButton.SetScale(2);
            this.addChild(this.exitToMenuButton);

            this.exitToMenuButton.SetPosition(this.startButton.Position.AddVec(0, this.startButton.ActiveHeight));

            let label = new objects.Label("Exit To Menu", "25px", "Acme", utility.Colors.WHITE);

            label.x = -this.exitToMenuButton.MainImage.ActiveHalfWidth * 0.58;
            label.y = -this.exitToMenuButton.MainImage.ActiveHalfHeight * 0.45;

            this.exitToMenuButton.addChild(label);

            this.exitToMenuButton.addEventListener("mouseover", () => {
                this.exitToMenuButton.MainImage.image = new objects.BitmapGameObject("amberDark", 2, config.Pivot.MIDCENTER).image;
            });

            this.exitToMenuButton.addEventListener("mouseout", () => {
                this.exitToMenuButton.MainImage.image = new objects.BitmapGameObject("amberNormal", 2, config.Pivot.MIDCENTER).image;
            });

            this.exitToMenuButton.addEventListener("click", () => { managers.GameManager.CurrentState = config.Scene.START; });;

            this.InitExitButton();
        }

        public InitExitButton(): void {

            this.exitButton = new objects.ContainerBitmapGameObject("amberNormal", 2, config.Pivot.MIDCENTER);
            this.exitButton.recalRegex = false;
            this.exitButton.SetScale(2);
            this.addChild(this.exitButton);

            this.exitButton.SetPosition(this.exitToMenuButton.Position.AddVec(0, this.exitToMenuButton.ActiveHeight));

            let label = new objects.Label("Exit", "30px", "Acme", utility.Colors.WHITE);

            label.x = -this.exitButton.MainImage.ActiveHalfWidth * 0.3;
            label.y = -this.exitButton.MainImage.ActiveHalfHeight * 0.5;

            this.exitButton.addEventListener("mouseover", () => {
                this.exitButton.MainImage.image = new objects.BitmapGameObject("amberDark", 2, config.Pivot.MIDCENTER).image;
            });

            this.exitButton.addEventListener("mouseout", () => {
                this.exitButton.MainImage.image = new objects.BitmapGameObject("amberNormal", 2, config.Pivot.MIDCENTER).image;
            });

            this.exitButton.addEventListener("click", () => { window.open('', '_self', '').close() });;

            this.exitButton.addChild(label);
        }

        public Update(): void {
        }

        public Reset(): void {
        }

        public Destroy(): void {
            this.removeAllChildren();
        }

        public Main(): void {
        }
    }
}