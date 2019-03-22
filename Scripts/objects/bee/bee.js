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
    var Bee = /** @class */ (function (_super) {
        __extends(Bee, _super);
        function Bee(imgNames, isIcon) {
            if (isIcon === void 0) { isIcon = false; }
            var _this = _super.call(this, imgNames, 1, config.Pivot.MIDCENTER) || this;
            _this.maxHealth = 100;
            _this.maxXP = 100;
            _this.currentHealth = _this.maxHealth;
            _this.currenXP = 0;
            _this.stings = [];
            _this.rotation = 0;
            _this.vertSpeed = 35;
            _this.horzSpeed = 35;
            _this.gameTimeElapsed = 0;
            _this.highScoreTime = localStorage.HighScore == null ? 0 : localStorage.HighScore;
            _this.inputMan = new managers.InputManager(_this.HandleKeyPressInput.bind(_this), _this.HandleKeyDownInput.bind(_this), _this.HandleKeyUpInput.bind(_this));
            Bee.Instance = _this;
            _this.beeHealth = new objects.HealthBar(["healthBorder", "greenFill", "redFill"], 1);
            managers.GameManager.CurrentScene.addChild(_this.beeHealth);
            _this.beeHealth.SetPosition(managers.GameManager.Screen.Center
                .AddVec(-_this.beeHealth.ActiveWidth * 4.5, -_this.beeHealth.ActiveHeight * 14));
            _this.beeExperience = new objects.HealthBar(["healthBorder", "goldenFill", "goldenFill"], 1);
            managers.GameManager.CurrentScene.addChild(_this.beeExperience);
            _this.beeExperience.SetPosition(managers.GameManager.Screen.Center
                .AddVec(-_this.beeHealth.ActiveWidth * 2.5, -_this.beeHealth.ActiveHeight * 14));
            _this.beeExperience.UpdateValue(0);
            return _this;
        }
        Bee.prototype.Attack = function () {
            this.rotation = -30;
        };
        Bee.prototype.Fly = function () {
            this.rotation = 0;
        };
        Bee.prototype.HandleKeyPressInput = function (event) {
            if (event.keyCode == config.Keys.SPACE)
                this.Fire();
        };
        Bee.prototype.HandleKeyDownInput = function (event) {
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
        };
        Bee.prototype.HandleKeyUpInput = function (event) {
            if (event.keyCode == config.Keys.SPACE)
                this.Fly();
        };
        Bee.prototype.Fire = function () {
            createjs.Sound.play("arrowShoot");
            var sting = new objects.BeeSting(); //"imageString", vel, scale);
            this.stings.push(sting);
            sting.SetPosition(this.Position.AddVec(-95, 45));
            managers.GameManager.CurrentScene.addChild(sting);
            return sting;
        };
        Bee.prototype.Update = function () {
            _super.prototype.Update.call(this);
            this.gameTimeElapsed += 1 / managers.GameManager.Screen.FRAMERATE;
            this.yourTimeVal.text = this.GetFormattedTime(this.gameTimeElapsed);
            this.highTimeVal.text = this.GetFormattedTime(this.highScoreTime);
            this.beeHealth.Update();
            this.beeExperience.Update();
            if (this.stings == null || this.stings.length == 0)
                return;
            for (var i = 0; i < this.stings.length; i++) {
                var sting = this.stings[i];
                for (var j = 0; j < managers.GameManager.EnemyManager.archers.length; j++) {
                    var archer = managers.GameManager.EnemyManager.archers[j];
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
            for (var i = 0; i < this.stings.length; i++) {
                var sting = this.stings[i];
                if (sting.IsOutOfScreen()) {
                    this.DestroySting(i);
                }
                else
                    sting.Update();
            }
        };
        Bee.prototype.AddXP = function (xp) {
            if (this.currenXP < this.maxXP) {
                this.currenXP += xp;
            }
            this.beeExperience.UpdateValue(100 * (this.currenXP / this.maxXP));
            if (this.currenXP >= this.maxXP) {
                this.ChangeState("evolved");
            }
        };
        Bee.prototype.DestroySting = function (index) {
            managers.GameManager.CurrentScene.removeChild(this.stings[index]);
            this.stings.splice(index, 1);
        };
        Bee.prototype.DamageByArrow = function () {
            this.currentHealth -= 0.2 * this.maxHealth;
            this.beeHealth.UpdateValue((this.currentHealth / this.maxHealth) * 100);
        };
        Bee.prototype.GetFormattedTime = function (seconds) {
            var hh = 0;
            var mm = 0;
            var ss = 0;
            hh = Math.floor(seconds / 3600);
            mm = Math.floor(Math.floor(seconds % 3600) / 60);
            ss = Math.floor(seconds - (mm * 60) - (hh * 3600));
            return (hh > 9 ? "" : "0") + hh.toString() + ":" + (mm > 9 ? "" : "0") + mm.toString() + ":" + (ss > 9 ? "" : "0") + ss.toString();
        };
        Bee.prototype.SetStaticLabels = function () {
            var l1 = new objects.Label("HP ", "25px", "Acme", utility.Colors.WHITE);
            var l2 = new objects.Label("Exp ", "25px", "Acme", utility.Colors.WHITE);
            var pos = managers.GameManager.Screen.TopLeft.AddVec(0, 0);
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
        };
        return Bee;
    }(objects.AnimatedContainerObject));
    objects.Bee = Bee;
})(objects || (objects = {}));
//# sourceMappingURL=bee.js.map