module scenes {
    export class StartScene extends scenes.Scene {

        private bg: objects.Background;

        private startButton: objects.ContainerBitmapGameObject;
        private instructionButton: objects.ContainerBitmapGameObject;
        private exitButton: objects.ContainerBitmapGameObject;

        bees: objects.AnimatedBitmapObject[] = [];

        constructor() {
            super();

            this.Init();
        }

        public Init(): void {

            this.sceneState = config.Scene.START;

            managers.GameManager.CurrentState = this.sceneState;
            managers.GameManager.CurrentScene = this;
            this.Start();
        }

        public Start(): void {

            this.bg = new objects.Background();
            this.addChild(this.bg);
            this.bg.alpha = 0.9;

            this.bg.SetPosition(managers.GameManager.Screen.BottomLeft.AddY(-this.bg.ActiveHalfHeight));

            this.InitStartButton();

            this.InitLogoNStuff();

            this.Main();
        }

        private InitLogoNStuff(): void {

            let logo = new objects.BitmapGameObject("logo", 0.5);

            logo.SetPosition(managers.GameManager.Screen.MidRight.AddVec(-logo.ActiveWidth * 2, -logo.ActiveHeight * 2.5));

            this.addChild(logo);
            let presentsText = new objects.Label("Presents", "35px", "Acme", utility.Colors.WHITE);

            let gameTitle = new objects.Label("Forest Buzz", "60px", "Acme", utility.Colors.WHITE);

            presentsText.x = logo.Position.x + 35;
            presentsText.y = logo.Position.y + 150;

            gameTitle.x = logo.Position.x - 50;
            gameTitle.y = logo.Position.y + 250;

            this.addChild(gameTitle);
            this.addChild(presentsText);

            this.bees.push(new objects.AnimatedBitmapObject(["bdrill0", "bdrill1", "bdrill2", "bdrill3", "bdrill4", "bdrill5", "bdrill6", "bdrill7", "bdrill8", "bdrill9", "bdrill10",
                "bdrill11", "bdrill12", "bdrill13", "bdrill14", "bdrill15", "bdrill16", "bdrill17", "bdrill18", "bdrill19", "bdrill20",
                "bdrill21", "bdrill22", "bdrill23", "bdrill24", "bdrill25", "bdrill26", "bdrill27", "bdrill28", "bdrill29"]));

            this.bees.push(new objects.AnimatedBitmapObject(["mbdrill0", "mbdrill1", "mbdrill2", "mbdrill3", "mbdrill4", "mbdrill5", "mbdrill6", "mbdrill7", "mbdrill8", "mbdrill9", "mbdrill10",
                "mbdrill11", "mbdrill12", "mbdrill13", "mbdrill14", "mbdrill15", "mbdrill16", "mbdrill17", "mbdrill18", "mbdrill19", "mbdrill20",
                "mbdrill21", "mbdrill22", "mbdrill23", "mbdrill24", "mbdrill25", "mbdrill26", "mbdrill27", "mbdrill28", "mbdrill29"]));

            let scale = 0.5;
            this.bees[0].SetScale(scale);
            this.bees[1].SetScale(scale);

            this.bees[0].SetPosition(new math.Vec2(gameTitle.x - this.bees[0].ActiveWidth, gameTitle.y));
            this.bees[1].SetPosition(new math.Vec2(gameTitle.x + gameTitle.Width + this.bees[0].ActiveWidth, gameTitle.y));

            this.bees[1].scaleX *= -1;

            this.addChild(this.bees[0]);
            this.addChild(this.bees[1]);
        }

        public InitStartButton(): void {

            this.startButton = new objects.ContainerBitmapGameObject("amberNormal", 2);
            this.startButton.recalRegex = false;
            this.startButton.SetScale(2);
            this.addChild(this.startButton);
            this.startButton.SetPosition(managers.GameManager.Screen.Center);

            let label = new objects.Label("Start", "30px", "Acme", utility.Colors.WHITE);

            label.x = -this.startButton.MainImage.ActiveHalfWidth * 0.3;
            label.y = -this.startButton.MainImage.ActiveHalfHeight * 0.5;

            this.startButton.addChild(label);

            this.startButton.addEventListener("mouseover", () => {
                this.startButton.MainImage.image = new objects.BitmapGameObject("amberDark", 2).image;
            });

            this.startButton.addEventListener("mouseout", () => {
                this.startButton.MainImage.image = new objects.BitmapGameObject("amberNormal", 2).image;
            });

            this.startButton.addEventListener("click", () => { managers.GameManager.CurrentState = config.Scene.GAMEPLAY; });;

            this.InitInstructionButton();
        }

        public InitInstructionButton(): void {

            this.instructionButton = new objects.ContainerBitmapGameObject("amberNormal", 2);
            this.instructionButton.recalRegex = false;
            this.instructionButton.SetScale(2);
            this.addChild(this.instructionButton);

            this.instructionButton.SetPosition(this.startButton.Position.AddVec(0, this.startButton.ActiveHeight));

            let label = new objects.Label("Instructions", "25px", "Acme", utility.Colors.WHITE);

            label.x = -this.instructionButton.MainImage.ActiveHalfWidth * 0.58;
            label.y = -this.instructionButton.MainImage.ActiveHalfHeight * 0.45;

            this.instructionButton.addChild(label);

            this.instructionButton.addEventListener("mouseover", () => {
                this.instructionButton.MainImage.image = new objects.BitmapGameObject("amberDark", 2).image;
            });

            this.instructionButton.addEventListener("mouseout", () => {
                this.instructionButton.MainImage.image = new objects.BitmapGameObject("amberNormal", 2).image;
            });

            this.instructionButton.addEventListener("click", () => { managers.GameManager.CurrentState = config.Scene.INSTRUCTION; });;

            this.InitExitButton();
        }

        public InitExitButton(): void {

            this.exitButton = new objects.ContainerBitmapGameObject("amberNormal", 2);
            this.exitButton.recalRegex = false;
            this.exitButton.SetScale(2);
            this.addChild(this.exitButton);

            this.exitButton.SetPosition(this.instructionButton.Position.AddVec(0, this.instructionButton.ActiveHeight));

            let label = new objects.Label("Exit", "30px", "Acme", utility.Colors.WHITE);

            label.x = -this.exitButton.MainImage.ActiveHalfWidth * 0.3;
            label.y = -this.exitButton.MainImage.ActiveHalfHeight * 0.5;

            this.exitButton.addEventListener("mouseover", () => {
                this.exitButton.MainImage.image = new objects.BitmapGameObject("amberDark", 2).image;
            });

            this.exitButton.addEventListener("mouseout", () => {
                this.exitButton.MainImage.image = new objects.BitmapGameObject("amberNormal", 2).image;
            });

            this.exitButton.addEventListener("click", () => { window.open('', '_self', '').close() });;

            this.exitButton.addChild(label);
        }

        public Update(): void {
            this.bees.forEach(x => x.Update());
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