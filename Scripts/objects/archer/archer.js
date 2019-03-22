var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Archer = /** @class */ (function (_super) {
        __extends(Archer, _super);
        function Archer() {
            var _this = _super.call(this, "archer", 0.4, config.Pivot.BOTTOMCENTER) || this;
            _this.spawnRate = 3;
            _this.spawnTime = 0;
            _this.arrows = [];
            _this.speed = 5;
            _this.maxHealth = 100;
            _this.Health = _this.maxHealth;
            return _this;
        }
        Archer.prototype.Update = function () {
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
            for (var i = 0; i < this.arrows.length; i++) {
                var arrow = this.arrows[i];
                if (arrow.HorizontalSpan().y < 0)
                    this.DestroyArrow(i);
                else if (managers.CollisionManager.CheckForBitmapNAnim(arrow, objects.Bee.Instance)) {
                    console.log("destroying");
                    this.DestroyArrow(i);
                    objects.Bee.Instance.DamageByArrow();
                    if (objects.Bee.Instance.currentHealth <= 0) {
                        if (objects.Bee.Instance.gameTimeElapsed > objects.Bee.Instance.highScoreTime)
                            localStorage.setItem("HighScore", objects.Bee.Instance.gameTimeElapsed.toString());
                        managers.GameManager.CurrentState = config.Scene.OVER;
                    }
                }
                else
                    arrow.Update();
            }
        };
        Archer.prototype.Fire = function () {
            createjs.Sound.play("arrowShoot");
            var arrow = new objects.Arrow("arrow", new math.Vec2(20, -20), 0.4);
            arrow.SetPosition(this.Position.AddVec(-100, -200));
            this.arrows.push(arrow);
            managers.GameManager.CurrentScene.addChild(arrow);
            arrow.rotation = -10;
            this.spawnTime = 0;
            return arrow;
        };
        Archer.prototype.DestroyArrow = function (index) {
            managers.GameManager.CurrentScene.removeChild(this.arrows[index]);
            this.arrows.splice(index, 1);
        };
        Archer.prototype.Damage = function (value) {
            this.Health -= value;
        };
        Archer.prototype.DestroyAllArrows = function () {
            for (var i = 0; i < this.arrows.length; i++) {
                var arrow = this.arrows[i];
                managers.GameManager.CurrentScene.removeChild(arrow);
            }
            this.arrows = [];
        };
        return Archer;
    }(objects.ContainerBitmapGameObject));
    objects.Archer = Archer;
})(objects || (objects = {}));
//# sourceMappingURL=archer.js.map