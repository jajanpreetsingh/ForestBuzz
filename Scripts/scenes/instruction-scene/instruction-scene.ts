module scenes {
    export class InstructionsScene extends scenes.Scene {

        private bg: objects.Background;

        private exitButton: objects.ContainerBitmapGameObject;

        constructor() {
            super();

            this.Init();
        }

        public Init(): void {
            this.sceneState = config.Scene.INSTRUCTION;

            managers.GameManager.CurrentState = this.sceneState;
            managers.GameManager.CurrentScene = this;
            this.Start();
        }

        public Start(): void {

            this.bg = new objects.Background();
            this.addChild(this.bg);
            this.bg.alpha - 0.75;

            this.bg.SetPosition(managers.GameManager.Screen.BottomLeft.AddY(-this.bg.ActiveHalfHeight));

            let labels: objects.Label[] = []

            labels.push(new objects.Label("1. Use Up and down arrow keys to evade archer attacks", "30px", "Acme", utility.Colors.WHITE));
            labels.push(new objects.Label("2. Use Space bar to fire stings at archers", "30px", "Acme", utility.Colors.WHITE));
            labels.push(new objects.Label("3. Kill archers to gain experience and evolve", "30px", "Acme", utility.Colors.WHITE));
            labels.push(new objects.Label("4. Try to remain in Game as long as possible", "30px", "Acme", utility.Colors.WHITE));

            let y = 50;

            labels.forEach(x => {
                this.addChild(x);

                x.x = 50;
                x.y = y;
                y += 120;
            });
            this.InitExitButton();

            this.Main();
        }

        public InitExitButton(): void {

            this.exitButton = new objects.ContainerBitmapGameObject("amberNormal", 2, config.Pivot.MIDCENTER);
            this.exitButton.recalRegex = false;
            this.exitButton.SetScale(2);
            this.addChild(this.exitButton);

            this.exitButton.SetPosition(managers.GameManager.Screen.BottomRight
                // .AddVec(-this.exitButton.ActiveWidth, -this.exitButton.ActiveHeight)
            );

            let label = new objects.Label("Back", "30px", "Acme", utility.Colors.WHITE);

            label.x = -this.exitButton.MainImage.ActiveHalfWidth * 0.3;
            label.y = -this.exitButton.MainImage.ActiveHalfHeight * 0.5;

            this.exitButton.addEventListener("mouseover", () => {
                this.exitButton.MainImage.image = new objects.BitmapGameObject("amberDark", 2, config.Pivot.MIDCENTER).image;
            });

            this.exitButton.addEventListener("mouseout", () => {
                this.exitButton.MainImage.image = new objects.BitmapGameObject("amberNormal", 2, config.Pivot.MIDCENTER).image;
            });

            this.exitButton.addEventListener("click", () => { managers.GameManager.CurrentState = config.Scene.START; });;

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