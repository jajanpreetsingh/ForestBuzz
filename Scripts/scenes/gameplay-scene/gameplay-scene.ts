module scenes {
    export class GameplayScene extends scenes.Scene {

        bg1: objects.Background;
        bg2: objects.Background;
        bee: objects.Bee;

        yourTime: objects.Label;
        HighScore: objects.Label;

        yourTimeVal: objects.Label;
        highTimeVal: objects.Label;

        constructor() {
            super();
            this.Init();
        }

        public Init(): void {
            this.sceneState = config.Scene.GAMEPLAY;

            managers.GameManager.CurrentScene = this;

            managers.GameManager.EnemyManager = new managers.EnemyManager();

            this.Start();
        }

        public Start(): void {
            this.Main();
        }

        public Update(): void {

            if (this.bee)
                this.bee.Update();

            if (this.bg1)
                this.bg1.Update();

            if (this.bg2)
                this.bg2.Update();

            managers.GameManager.EnemyManager.Update();
        }

        public Reset(): void {
        }

        public Destroy(): void {
        }

        public Main(): void {
            this.bg1 = new objects.Background();
            this.addChild(this.bg1);
            this.bg2 = new objects.Background();
            this.addChild(this.bg2);

            this.bg1.SetPosition(managers.GameManager.Screen.BottomLeft.AddY(-this.bg1.ActiveHalfHeight));
            this.bg2.SetPosition(this.bg1.Position.AddX(this.bg1.ActiveWidth));

            this.bee = new objects.Bee(["bdrill0", "bdrill1", "bdrill2", "bdrill3", "bdrill4", "bdrill5", "bdrill6", "bdrill7", "bdrill8", "bdrill9", "bdrill10",
                "bdrill11", "bdrill12", "bdrill13", "bdrill14", "bdrill15", "bdrill16", "bdrill17", "bdrill18", "bdrill19", "bdrill20",
                "bdrill21", "bdrill22", "bdrill23", "bdrill24", "bdrill25", "bdrill26", "bdrill27", "bdrill28", "bdrill29"]);

            this.bee.AddStateAnimation("evolved", ["mbdrill0", "mbdrill1", "mbdrill2", "mbdrill3", "mbdrill4", "mbdrill5", "mbdrill6", "mbdrill7", "mbdrill8", "mbdrill9", "mbdrill10",
                "mbdrill11", "mbdrill12", "mbdrill13", "mbdrill14", "mbdrill15", "mbdrill16", "mbdrill17", "mbdrill18", "mbdrill19", "mbdrill20",
                "mbdrill21", "mbdrill22", "mbdrill23", "mbdrill24", "mbdrill25", "mbdrill26", "mbdrill27", "mbdrill28", "mbdrill29"]);

            this.addChild(this.bee);
            this.bee.SetPosition(managers.GameManager.Screen.MidLeft.AddX(this.bee.ActiveWidth));

            this.bee.SetStaticLabels();
        }
    }

    export enum GameplayChildIndex {
        BgGradient = 0,
        Forest,
        Bee,
        Archer
    }
}