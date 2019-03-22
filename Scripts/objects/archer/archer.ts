module objects {
    export class Archer extends ContainerBitmapGameObject {

        private spawnRate: number = 3;

        private spawnTime: number = 0;

        private arrows: objects.Arrow[] = [];

        private speed: number = 5;

        private maxHealth = 100;

        public Health;

        constructor() {
            super("archer", 0.4, config.Pivot.BOTTOMCENTER);

            this.Health = this.maxHealth;
        }

        public Update(): void {

            this.SetPosition(this.Position.AddX(-this.speed));

            if (this.Position.x < -this.ActiveHalfWidth)
                this.SetPosition(managers.GameManager.Screen.BottomRight.AddY(0));

            if (this.spawnTime >= this.spawnRate) {
                this.Fire();
            }
            else {
                this.spawnTime += 1 / managers.GameManager.Screen.FRAMERATE;
            }

            if (this.arrows == null || this.arrows.length == 0)
                return;

            for (let i = 0; i < this.arrows.length; i++) {
                let arrow = this.arrows[i];

                if (arrow.HorizontalSpan().y < 0)
                    this.DestroyArrow(i);
                else if (managers.CollisionManager.CheckForBitmapNAnim(arrow, Bee.Instance)) {
                    console.log("destroying");
                    this.DestroyArrow(i);

                    Bee.Instance.DamageByArrow();

                    if (Bee.Instance.currentHealth <= 0) {

                        if (Bee.Instance.gameTimeElapsed > Bee.Instance.highScoreTime)
                            localStorage.setItem("HighScore", Bee.Instance.gameTimeElapsed.toString());

                        managers.GameManager.CurrentState = config.Scene.OVER;
                    }
                }
                else
                    arrow.Update();
            }
        }

        public Fire(): objects.Arrow {//("bulletPlayer", new math.Vec2(250, -400), 0.1);

            createjs.Sound.play("arrowShoot");
            let arrow = new objects.Arrow("arrow", new math.Vec2(20, -20), 0.4);

            arrow.SetPosition(this.Position.AddVec(-100, -200));

            this.arrows.push(arrow);

            managers.GameManager.CurrentScene.addChild(arrow);

            arrow.rotation = -10;

            this.spawnTime = 0;

            return arrow;
        }

        private DestroyArrow(index: number): void {

            managers.GameManager.CurrentScene.removeChild(this.arrows[index]);

            this.arrows.splice(index, 1);
        }

        public Damage(value: number): void {

            this.Health -= value;
        }

        public DestroyAllArrows(): void {
            for (let i = 0; i < this.arrows.length; i++) {
                let arrow = this.arrows[i];
                managers.GameManager.CurrentScene.removeChild(arrow);
            }

            this.arrows = [];
        }
    }
}