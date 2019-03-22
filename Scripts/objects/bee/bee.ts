module objects {
    export class Bee extends AnimatedContainerObject {

        public static Instance: Bee;

        private vertSpeed: number;

        private horzSpeed: number;

        inputMan: managers.InputManager;

        private stings: objects.BeeSting[];

        private beeHealth: objects.HealthBar;

        private beeExperience: objects.HealthBar;

        private maxHealth: number = 100;

        public currentHealth: number;

        private maxXP: number = 100;

        private currenXP: number;

        public gameTimeElapsed: number;

        public highScoreTime: number;

        yourTime: objects.Label;
        HighScore: objects.Label;

        yourTimeVal: objects.Label;
        highTimeVal: objects.Label;

        constructor(imgNames: string[], isIcon: boolean = false) {

            super(imgNames, 1, config.Pivot.MIDCENTER);

            this.currentHealth = this.maxHealth;
            this.currenXP = 0;

            this.stings = [];

            this.rotation = 0;

            this.vertSpeed = 35;

            this.horzSpeed = 35;

            this.gameTimeElapsed = 0;

            this.highScoreTime = localStorage.HighScore == null ? 0 : localStorage.HighScore;

            this.inputMan = new managers.InputManager(this.HandleKeyPressInput.bind(this), this.HandleKeyDownInput.bind(this), this.HandleKeyUpInput.bind(this));

            Bee.Instance = this;

            this.beeHealth = new objects.HealthBar(["healthBorder", "greenFill", "redFill"], 1);
            managers.GameManager.CurrentScene.addChild(this.beeHealth);
            this.beeHealth.SetPosition(managers.GameManager.Screen.Center
                .AddVec(-this.beeHealth.ActiveWidth * 4.5, -this.beeHealth.ActiveHeight * 14));

            this.beeExperience = new objects.HealthBar(["healthBorder", "goldenFill", "goldenFill"], 1);
            managers.GameManager.CurrentScene.addChild(this.beeExperience);
            this.beeExperience.SetPosition(managers.GameManager.Screen.Center
                .AddVec(-this.beeHealth.ActiveWidth * 2.5, -this.beeHealth.ActiveHeight * 14));

            this.beeExperience.UpdateValue(0);
        }

        public Attack(): void {
            this.rotation = -30;
        }

        public Fly(): void {
            this.rotation = 0;
        }

        public HandleKeyPressInput(event: KeyboardEvent): void {
            if (event.keyCode == config.Keys.SPACE)
                this.Fire();
        }

        public HandleKeyDownInput(event: KeyboardEvent): void {


            switch (event.keyCode) {
                case config.Keys.SPACE:
                    this.Attack();
                    break;

                case config.Keys.DOWN_ARROW:
                    this.y += this.vertSpeed;

                    if (this.y > managers.GameManager.Screen.Height)
                        this.y = managers.GameManager.Screen.Height;
                    break;

                case config.Keys.UP_ARROW:
                    this.y -= this.vertSpeed;

                    if (this.y < this.ActiveHeight)
                        this.y = this.ActiveHeight;
                    break;

                case config.Keys.RIGHT_ARROW:
                    this.x += this.horzSpeed;

                    if (this.x > managers.GameManager.Screen.Width)
                        this.x = managers.GameManager.Screen.Width;
                    break;

                case config.Keys.LEFT_ARROW:
                    this.x -= this.horzSpeed;

                    if (this.x < this.ActiveWidth)
                        this.x = this.ActiveWidth;
                    break;

            }
        }

        public HandleKeyUpInput(event: KeyboardEvent): void {
            if (event.keyCode == config.Keys.SPACE)
                this.Fly();
        }

        public Fire(): objects.BeeSting {
            createjs.Sound.play("arrowShoot");

            let sting = new objects.BeeSting();//"imageString", vel, scale);

            this.stings.push(sting);

            sting.SetPosition(this.Position.AddVec(-95, 45));

            managers.GameManager.CurrentScene.addChild(sting);

            return sting;
        }

        public Update(): void {

            super.Update();

            this.gameTimeElapsed += 1 / managers.GameManager.Screen.FRAMERATE;

            this.yourTimeVal.text = this.GetFormattedTime(this.gameTimeElapsed);

            this.highTimeVal.text = this.GetFormattedTime(this.highScoreTime);

            this.beeHealth.Update();

            this.beeExperience.Update();

            if (this.stings == null || this.stings.length == 0)
                return;

            for (let i = 0; i < this.stings.length; i++) {
                let sting = this.stings[i];

                for (let j = 0; j < managers.GameManager.EnemyManager.archers.length; j++) {
                    let archer = managers.GameManager.EnemyManager.archers[j];

                    if (managers.CollisionManager.CheckForBitmapNContainer(sting, archer)) {
                        this.DestroySting(i);

                        archer.Damage(100);

                        if (archer.Health <= 0) {
                            managers.GameManager.EnemyManager.DamageEnemy(j);
                            this.AddXP(4);
                        }
                    }
                }

            }

            for (let i = 0; i < this.stings.length; i++) {
                let sting = this.stings[i];

                if (sting.IsOutOfScreen()) {
                    this.DestroySting(i);
                }
                else
                    sting.Update();
            }
        }

        public AddXP(xp: number): void {

            if (this.currenXP < this.maxXP) {
                this.currenXP += xp;
            }

            this.beeExperience.UpdateValue(100 * (this.currenXP / this.maxXP));

            if (this.currenXP >= this.maxXP) {
                this.ChangeState("evolved");
            }
        }

        private DestroySting(index: number): void {

            managers.GameManager.CurrentScene.removeChild(this.stings[index]);

            this.stings.splice(index, 1);
        }

        public DamageByArrow(): void {
            this.currentHealth -= 0.2 * this.maxHealth;

            this.beeHealth.UpdateValue((this.currentHealth / this.maxHealth) * 100);
        }

        public GetFormattedTime(seconds: number): string {

            let hh = 0;
            let mm = 0;
            let ss = 0;

            hh = Math.floor(seconds / 3600);
            mm = Math.floor(Math.floor(seconds % 3600) / 60);
            ss = Math.floor(seconds - (mm * 60) - (hh * 3600));

            return (hh > 9 ? "" : "0") + hh.toString() + ":" + (mm > 9 ? "" : "0") + mm.toString() + ":" + (ss > 9 ? "" : "0") + ss.toString();
        }

        public SetStaticLabels(): void {

            let l1 = new objects.Label("HP ", "25px", "Acme", utility.Colors.WHITE);

            let l2 = new objects.Label("Exp ", "25px", "Acme", utility.Colors.WHITE);

            let pos = managers.GameManager.Screen.TopLeft.AddVec(0, 0);

            l1.x = pos.x;
            l1.y = pos.y;

            l2.x = pos.x + 250;
            l2.y = pos.y;

            managers.GameManager.CurrentScene.addChild(l1);

            managers.GameManager.CurrentScene.addChild(l2);

            this.yourTime = new objects.Label("Your Time  ", "25px", "Acme", utility.Colors.WHITE);
            managers.GameManager.CurrentScene.addChild(this.yourTime);
            this.yourTime.x = pos.x + 520;
            this.yourTime.y = pos.y;

            this.yourTimeVal = new objects.Label("88:88:88", "25px", "Acme", utility.Colors.WHITE);
            managers.GameManager.CurrentScene.addChild(this.yourTimeVal);
            this.yourTimeVal.x = pos.x + 650;
            this.yourTimeVal.y = pos.y;

            this.HighScore = new objects.Label("High Score  ", "25px", "Acme", utility.Colors.WHITE);
            managers.GameManager.CurrentScene.addChild(this.HighScore);
            this.HighScore.x = pos.x + 790;
            this.HighScore.y = pos.y;

            this.highTimeVal = new objects.Label("88:88:88", "25px", "Acme", utility.Colors.WHITE);
            managers.GameManager.CurrentScene.addChild(this.highTimeVal);
            this.highTimeVal.x = pos.x + 920;
            this.highTimeVal.y = pos.y;
        }
    }
}