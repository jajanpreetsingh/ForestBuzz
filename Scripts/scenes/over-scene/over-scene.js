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
var scenes;
(function (scenes) {
    var OverScene = /** @class */ (function (_super) {
        __extends(OverScene, _super);
        function OverScene() {
            var _this = _super.call(this) || this;
            _this.Init();
            return _this;
        }
        OverScene.prototype.Init = function () {
            this.sceneState = config.Scene.OVER;
            managers.GameManager.CurrentState = this.sceneState;
            managers.GameManager.CurrentScene = this;
            this.Start();
        };
        OverScene.prototype.Start = function () {
            this.bg = new objects.Background();
            this.addChild(this.bg);
            this.bg.alpha - 0.75;
            this.bg.SetPosition(managers.GameManager.Screen.BottomLeft.AddY(-this.bg.ActiveHalfHeight));
            this.InitStartButton();
            this.Main();
        };
        OverScene.prototype.InitStartButton = function () {
            var _this = this;
            this.startButton = new objects.ContainerBitmapGameObject("amberNormal", 2, config.Pivot.MIDCENTER);
            this.startButton.recalRegex = false;
            this.startButton.SetScale(2);
            this.addChild(this.startButton);
            this.startButton.SetPosition(managers.GameManager.Screen.Center);
            var label = new objects.Label("Play Again", "30px", "Acme", utility.Colors.WHITE);
            label.x = -this.startButton.MainImage.ActiveHalfWidth * 0.6;
            label.y = -this.startButton.MainImage.ActiveHalfHeight * 0.5;
            this.startButton.addChild(label);
            this.startButton.addEventListener("mouseover", function () {
                _this.startButton.MainImage.image = new objects.BitmapGameObject("amberDark", 2, config.Pivot.MIDCENTER).image;
            });
            this.startButton.addEventListener("mouseout", function () {
                _this.startButton.MainImage.image = new objects.BitmapGameObject("amberNormal", 2, config.Pivot.MIDCENTER).image;
            });
            this.startButton.addEventListener("click", function () { managers.GameManager.CurrentState = config.Scene.GAMEPLAY; });
            ;
            this.InitInstructionButton();
        };
        OverScene.prototype.InitInstructionButton = function () {
            var _this = this;
            this.exitToMenuButton = new objects.ContainerBitmapGameObject("amberNormal", 2, config.Pivot.MIDCENTER);
            this.exitToMenuButton.recalRegex = false;
            this.exitToMenuButton.SetScale(2);
            this.addChild(this.exitToMenuButton);
            this.exitToMenuButton.SetPosition(this.startButton.Position.AddVec(0, this.startButton.ActiveHeight));
            var label = new objects.Label("Exit To Menu", "25px", "Acme", utility.Colors.WHITE);
            label.x = -this.exitToMenuButton.MainImage.ActiveHalfWidth * 0.58;
            label.y = -this.exitToMenuButton.MainImage.ActiveHalfHeight * 0.45;
            this.exitToMenuButton.addChild(label);
            this.exitToMenuButton.addEventListener("mouseover", function () {
                _this.exitToMenuButton.MainImage.image = new objects.BitmapGameObject("amberDark", 2, config.Pivot.MIDCENTER).image;
            });
            this.exitToMenuButton.addEventListener("mouseout", function () {
                _this.exitToMenuButton.MainImage.image = new objects.BitmapGameObject("amberNormal", 2, config.Pivot.MIDCENTER).image;
            });
            this.exitToMenuButton.addEventListener("click", function () { managers.GameManager.CurrentState = config.Scene.START; });
            ;
            this.InitExitButton();
        };
        OverScene.prototype.InitExitButton = function () {
            var _this = this;
            this.exitButton = new objects.ContainerBitmapGameObject("amberNormal", 2, config.Pivot.MIDCENTER);
            this.exitButton.recalRegex = false;
            this.exitButton.SetScale(2);
            this.addChild(this.exitButton);
            this.exitButton.SetPosition(this.exitToMenuButton.Position.AddVec(0, this.exitToMenuButton.ActiveHeight));
            var label = new objects.Label("Exit", "30px", "Acme", utility.Colors.WHITE);
            label.x = -this.exitButton.MainImage.ActiveHalfWidth * 0.3;
            label.y = -this.exitButton.MainImage.ActiveHalfHeight * 0.5;
            this.exitButton.addEventListener("mouseover", function () {
                _this.exitButton.MainImage.image = new objects.BitmapGameObject("amberDark", 2, config.Pivot.MIDCENTER).image;
            });
            this.exitButton.addEventListener("mouseout", function () {
                _this.exitButton.MainImage.image = new objects.BitmapGameObject("amberNormal", 2, config.Pivot.MIDCENTER).image;
            });
            this.exitButton.addEventListener("click", function () { window.open('', '_self', '').close(); });
            ;
            this.exitButton.addChild(label);
        };
        OverScene.prototype.Update = function () {
        };
        OverScene.prototype.Reset = function () {
        };
        OverScene.prototype.Destroy = function () {
            this.removeAllChildren();
        };
        OverScene.prototype.Main = function () {
        };
        return OverScene;
    }(scenes.Scene));
    scenes.OverScene = OverScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=over-scene.js.map