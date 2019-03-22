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
    var Background = /** @class */ (function (_super) {
        __extends(Background, _super);
        function Background() {
            var _this = _super.call(this, "forest", 1, config.Pivot.BOTTOMLEFT) || this;
            _this.speed = 5;
            var screen = managers.GameManager.Screen;
            _this.SetScale((screen.Width / _this.ActiveWidth));
            _this.alpha = 1;
            return _this;
        }
        Background.prototype.Update = function () {
            this.SetPosition(this.Position.AddX(-this.speed));
            if (this.Position.x <= -this.ActiveWidth)
                this.SetPosition(managers.GameManager.Screen.BottomRight.AddY(-this.ActiveHalfHeight));
        };
        Background.prototype.Pause = function () {
            this.speed = 0;
            console.log(this.Position);
            console.log(this.ActiveWidth);
        };
        return Background;
    }(objects.BitmapGameObject));
    objects.Background = Background;
})(objects || (objects = {}));
//# sourceMappingURL=background.js.map