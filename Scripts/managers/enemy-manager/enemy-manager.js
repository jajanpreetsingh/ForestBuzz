var managers;
(function (managers) {
    var EnemyManager = /** @class */ (function () {
        function EnemyManager() {
            this.archers = [];
            this.spawnRate = 3;
            this.spawnTime = 0;
            this.maxEnemyCount = 3;
        }
        EnemyManager.prototype.SpawnEnemy = function () {
            var archer = new objects.Archer();
            this.archers.push(archer);
            archer.SetPosition(managers.GameManager.Screen.BottomRight.AddY(0));
            managers.GameManager.CurrentScene.addChild(archer);
            this.spawnTime = 0;
            return archer;
        };
        EnemyManager.prototype.Update = function () {
            if (this.spawnTime >= this.spawnRate && this.archers.length < this.maxEnemyCount) {
                this.SpawnEnemy();
            }
            else {
                this.spawnTime += 1 / managers.GameManager.Screen.FRAMERATE;
            }
            for (var j = 0; j < this.archers.length; j++) {
                var archer = this.archers[j];
                archer.Update();
            }
        };
        EnemyManager.prototype.DestroyArcher = function (index) {
            this.archers[index].DestroyAllArrows();
            managers.GameManager.CurrentScene.removeChild(this.archers[index]);
            this.archers.splice(index, 1);
        };
        EnemyManager.prototype.DamageEnemy = function (index) {
            this.archers[index].Damage(100);
            if (this.archers[index].Health <= 0)
                this.DestroyArcher(index);
        };
        return EnemyManager;
    }());
    managers.EnemyManager = EnemyManager;
})(managers || (managers = {}));
//# sourceMappingURL=enemy-manager.js.map