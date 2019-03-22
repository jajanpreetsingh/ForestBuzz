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
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        function Enemy(imageString, scale, pivot) {
            if (scale === void 0) { scale = 1; }
            if (pivot === void 0) { pivot = config.Pivot.MIDCENTER; }
            var _this = _super.call(this, imageString, scale, pivot) || this;
            //this.Tag = config.Tags.Enemy;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Enemy.prototype, "MaxHealth", {
            get: function () {
                return this.maxHealth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Enemy.prototype, "Health", {
            get: function () {
                return this.health;
            },
            enumerable: true,
            configurable: true
        });
        Enemy.prototype.InitEnemyHealth = function (maxHealth) {
            this.maxHealth = maxHealth;
            this.health = this.maxHealth;
        };
        Enemy.prototype.Start = function () {
        };
        Enemy.prototype.Update = function () {
        };
        Enemy.prototype.Damage = function (damage) {
            if (this.Health <= 0) {
                return;
            }
            if (this.Health < damage)
                this.health = 0;
            this.health -= damage;
            this.UpdateHealthUI();
        };
        Enemy.prototype.UpdateHealthUI = function () {
        };
        return Enemy;
    }(objects.ContainerBitmapGameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map