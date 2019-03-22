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
    var InstructionsScene = /** @class */ (function (_super) {
        __extends(InstructionsScene, _super);
        function InstructionsScene() {
            var _this = _super.call(this) || this;
            _this.Init();
            return _this;
        }
        InstructionsScene.prototype.Init = function () {
            this.sceneState = config.Scene.INSTRUCTION;
            managers.GameManager.CurrentState = this.sceneState;
            managers.GameManager.CurrentScene = this;
            this.Start();
        };
        InstructionsScene.prototype.Start = function () {
            var _this = this;
            this.bg = new objects.Background();
            this.addChild(this.bg);
            this.bg.alpha - 0.75;
            this.bg.SetPosition(managers.GameManager.Screen.BottomLeft.AddY(-this.bg.ActiveHalfHeight));
            var labels = [];
            labels.push(new objects.Label("1. Use Up and down arrow keys to evade archer attacks", "30px", "Acme", utility.Colors.WHITE));
            labels.push(new objects.Label("2. Use Space bar to fire stings at archers", "30px", "Acme", utility.Colors.WHITE));
            labels.push(new objects.Label("3. Kill archers to gain experience and evolve", "30px", "Acme", utility.Colors.WHITE));
            labels.push(new objects.Label("4. Try to remain in Game as long as possible", "30px", "Acme", utility.Colors.WHITE));
            var y = 50;
            labels.forEach(function (x) {
                _this.addChild(x);
                x.x = 50;
                x.y = y;
                y += 120;
            });
            this.InitExitButton();
            this.Main();
        };
        InstructionsScene.prototype.InitExitButton = function () {
            var _this = this;
            this.exitButton = new objects.ContainerBitmapGameObject("amberNormal", 2, config.Pivot.MIDCENTER);
            this.exitButton.recalRegex = false;
            this.exitButton.SetScale(2);
            this.addChild(this.exitButton);
            this.exitButton.SetPosition(managers.GameManager.Screen.BottomRight
            // .AddVec(-this.exitButton.ActiveWidth, -this.exitButton.ActiveHeight)
            );
            var label = new objects.Label("Back", "30px", "Acme", utility.Colors.WHITE);
            label.x = -this.exitButton.MainImage.ActiveHalfWidth * 0.3;
            label.y = -this.exitButton.MainImage.ActiveHalfHeight * 0.5;
            this.exitButton.addEventListener("mouseover", function () {
                _this.exitButton.MainImage.image = new objects.BitmapGameObject("amberDark", 2, config.Pivot.MIDCENTER).image;
            });
            this.exitButton.addEventListener("mouseout", function () {
                _this.exitButton.MainImage.image = new objects.BitmapGameObject("amberNormal", 2, config.Pivot.MIDCENTER).image;
            });
            this.exitButton.addEventListener("click", function () { managers.GameManager.CurrentState = config.Scene.START; });
            ;
            this.exitButton.addChild(label);
        };
        InstructionsScene.prototype.Update = function () {
        };
        InstructionsScene.prototype.Reset = function () {
        };
        InstructionsScene.prototype.Destroy = function () {
            this.removeAllChildren();
        };
        InstructionsScene.prototype.Main = function () {
        };
        return InstructionsScene;
    }(scenes.Scene));
    scenes.InstructionsScene = InstructionsScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=instruction-scene.js.map