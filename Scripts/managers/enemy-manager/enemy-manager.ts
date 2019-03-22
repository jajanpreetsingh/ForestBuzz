module managers {
    export class EnemyManager {
        public archers: objects.Archer[] = [];

        private spawnRate: number = 3;

        private spawnTime: number = 0;

        private maxEnemyCount: number = 3;

        public SpawnEnemy(): objects.Archer {

            let archer = new objects.Archer();

            this.archers.push(archer);

            archer.SetPosition(managers.GameManager.Screen.BottomRight.AddY(0));

            managers.GameManager.CurrentScene.addChild(archer);

            this.spawnTime = 0;

            return archer;
        }

        public Update(): void {

            if (this.spawnTime >= this.spawnRate && this.archers.length < this.maxEnemyCount) {
                this.SpawnEnemy();
            }
            else {
                this.spawnTime += 1 / managers.GameManager.Screen.FRAMERATE;
            }

            for (let j = 0; j < this.archers.length; j++) {
                let archer = this.archers[j];

                archer.Update();
            }
        }

        private DestroyArcher(index: number): void {

            this.archers[index].DestroyAllArrows();

            managers.GameManager.CurrentScene.removeChild(this.archers[index]);

            this.archers.splice(index, 1);
        }

        public DamageEnemy(index: number): void {
            this.archers[index].Damage(100);

            if (this.archers[index].Health <= 0)
                this.DestroyArcher(index);
        }
    }
}