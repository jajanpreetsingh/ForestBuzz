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
    var HealthBar = /** @class */ (function (_super) {
        __extends(HealthBar, _super);
        function HealthBar(names, scale, pivot) {
            if (scale === void 0) { scale = 3; }
            if (pivot === void 0) { pivot = config.Pivot.MIDLEFT; }
            var _this = _super.call(this, names[0], scale, pivot) || this;
            _this.minScale = 0;
            _this.maxScale = 1.52;
            _this.currentScale = 0;
            _this.maxValue = 0;
            _this.redFillPercent = 35;
            _this.Value = 0;
            _this.recalRegex = false;
            _this.currentScale = _this.maxScale;
            //this.Bar = new objects.BitmapGameObject();
            _this.Bar.SetScales(scale, scale / 6);
            _this.redFill = new objects.BitmapGameObject(names[2], config.Pivot.MIDLEFT);
            _this.addChild(_this.redFill);
            _this.normalFill = new objects.BitmapGameObject(names[1], config.Pivot.MIDLEFT);
            _this.normalFill.scaleY = scale / 4;
            _this.normalFill.scaleX = _this.currentScale;
            _this.addChild(_this.normalFill);
            var sc = managers.GameManager.Screen;
            _this.normalFill.SetPosition(_this.normalFill.Position.AddVec(3500 * sc.UnitX, -1100 * sc.UnitY));
            _this.redFill.SetPosition(_this.normalFill.Position);
            _this.redFill.scaleY = _this.normalFill.scaleY;
            _this.redFill.scaleX = _this.normalFill.scaleX;
            _this.maxValue = 100;
            _this.Value = _this.maxValue;
            _this.Update();
            return _this;
        }
        Object.defineProperty(HealthBar.prototype, "Bar", {
            get: function () {
                return this.MainImage;
            },
            enumerable: true,
            configurable: true
        });
        HealthBar.prototype.Update = function () {
            this.redFill.scaleX = this.minScale + ((this.Value / 100) * (this.maxScale - this.minScale));
            this.normalFill.scaleX = this.redFill.scaleX;
            this.redFill.alpha = this.Value < this.GetRedFillValue() ? 1 : 0;
            this.normalFill.alpha = Math.abs(1 - this.redFill.alpha);
        };
        HealthBar.prototype.GetRedFillValue = function () {
            return (this.redFillPercent / 100) * this.maxValue;
        };
        HealthBar.prototype.UpdateValue = function (val) {
            this.Value = val;
            this.Update();
        };
        return HealthBar;
    }(objects.ContainerBitmapGameObject));
    objects.HealthBar = HealthBar;
})(objects || (objects = {}));
//# sourceMappingURL=health-ui.js.map