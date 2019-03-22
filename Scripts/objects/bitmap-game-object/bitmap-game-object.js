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
    var BitmapGameObject = /** @class */ (function (_super) {
        __extends(BitmapGameObject, _super);
        function BitmapGameObject(imageString, scale, pivot) {
            if (scale === void 0) { scale = 1; }
            if (pivot === void 0) { pivot = config.Pivot.MIDCENTER; }
            var _this = _super.call(this, managers.GameManager.ResourceManager.AssetManager.getResult(imageString)) || this;
            _this.recalRegex = true;
            _this._pivot = pivot;
            _this.SetScale(scale);
            _this.name = imageString;
            _this.CalculateRegex();
            _this.Init();
            return _this;
        }
        Object.defineProperty(BitmapGameObject.prototype, "Tag", {
            get: function () {
                return this.tag;
            },
            set: function (tag) {
                this.tag = tag;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitmapGameObject.prototype, "OriginalWidth", {
            get: function () {
                return this.getBounds().width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitmapGameObject.prototype, "OriginalHeight", {
            get: function () {
                return this.getBounds().height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitmapGameObject.prototype, "ActiveWidth", {
            get: function () {
                return this.OriginalWidth * this.scaleX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitmapGameObject.prototype, "ActiveHalfWidth", {
            get: function () {
                return this.ActiveWidth * 0.5;
                ;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitmapGameObject.prototype, "ActiveHeight", {
            get: function () {
                return this.OriginalHeight * this.scaleY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitmapGameObject.prototype, "ActiveHalfHeight", {
            get: function () {
                return this.ActiveHeight * 0.5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitmapGameObject.prototype, "Position", {
            get: function () {
                return new math.Vec2(this.x, this.y);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitmapGameObject.prototype, "Pivot", {
            get: function () {
                return this._pivot;
            },
            enumerable: true,
            configurable: true
        });
        BitmapGameObject.prototype.Init = function () {
        };
        BitmapGameObject.prototype.Start = function () {
        };
        BitmapGameObject.prototype.Update = function () {
        };
        BitmapGameObject.prototype.Reset = function () {
        };
        BitmapGameObject.prototype.Destroy = function () {
        };
        BitmapGameObject.prototype.SetPosition = function (pos) {
            this.x = pos.x;
            this.y = pos.y;
        };
        BitmapGameObject.prototype.GetPivot = function (pivot) {
            switch (pivot) {
                case config.Pivot.BOTTOMCENTER:
                    return new math.Vec2(0.5, 1);
                case config.Pivot.BOTTOMLEFT:
                    return new math.Vec2(0, 1);
                case config.Pivot.BOTTOMRIGHT:
                    return new math.Vec2(1, 1);
                case config.Pivot.MIDCENTER:
                    return new math.Vec2(0.5, 0.5);
                case config.Pivot.MIDLEFT:
                    return new math.Vec2(0, 0.5);
                case config.Pivot.MIDRIGHT:
                    return new math.Vec2(1, 0.5);
                case config.Pivot.TOPCENTER:
                    return new math.Vec2(0.5, 0);
                case config.Pivot.TOPLEFT:
                    return new math.Vec2(0, 0);
                case config.Pivot.TOPRIGHT:
                    return new math.Vec2(1, 0);
            }
        };
        BitmapGameObject.prototype.SetScale = function (value) {
            this.scaleX = this.scaleY = value;
            this.CalculateRegex();
        };
        BitmapGameObject.prototype.CalculateRegex = function () {
            var normPivot = this.GetPivot(this._pivot);
            if (!this.recalRegex)
                return;
            this.regX = this.ActiveWidth * normPivot.x;
            this.regY = this.ActiveHeight * normPivot.y;
        };
        BitmapGameObject.prototype.SetScales = function (valueX, valueY) {
            this.scaleX = valueX;
            this.scaleY = valueY;
            this.CalculateRegex();
        };
        BitmapGameObject.prototype.HorizontalSpan = function () {
            var result = new math.Vec2(0.5, 0.5);
            switch (this.Pivot) {
                case config.Pivot.BOTTOMLEFT:
                case config.Pivot.MIDLEFT:
                case config.Pivot.TOPLEFT:
                    result = new math.Vec2(this.x, this.x + this.ActiveWidth);
                    break;
                case config.Pivot.BOTTOMCENTER:
                case config.Pivot.MIDCENTER:
                case config.Pivot.TOPCENTER:
                    result = new math.Vec2(this.x - this.ActiveHalfWidth, this.x + this.ActiveHalfWidth);
                    break;
                case config.Pivot.BOTTOMRIGHT:
                case config.Pivot.MIDRIGHT:
                case config.Pivot.TOPRIGHT:
                    result = new math.Vec2(this.x - this.ActiveWidth, this.x);
                    break;
            }
            return result.SortCordinates();
        };
        BitmapGameObject.prototype.VerticalSpan = function () {
            var result = new math.Vec2(0.5, 0.5);
            switch (this.Pivot) {
                case config.Pivot.BOTTOMLEFT:
                case config.Pivot.BOTTOMCENTER:
                case config.Pivot.BOTTOMRIGHT:
                    result = new math.Vec2(this.y - this.ActiveHeight, this.y);
                    break;
                case config.Pivot.MIDLEFT:
                case config.Pivot.MIDCENTER:
                case config.Pivot.MIDRIGHT:
                    result = new math.Vec2(this.y - this.ActiveHalfHeight, this.y + this.ActiveHalfHeight);
                    break;
                case config.Pivot.TOPLEFT:
                case config.Pivot.TOPCENTER:
                case config.Pivot.TOPRIGHT:
                    result = new math.Vec2(this.y, this.y + this.ActiveHeight);
                    break;
            }
            return result.SortCordinates();
        };
        BitmapGameObject.prototype.IsOutOfScreen = function () {
            var spanx = this.HorizontalSpan();
            var spany = this.VerticalSpan();
            var isOut = (spanx.x <= managers.GameManager.Screen.MidLeft.x && spanx.y <= managers.GameManager.Screen.MidLeft.x)
                || (spanx.x >= managers.GameManager.Screen.MidRight.x && spanx.y >= managers.GameManager.Screen.MidRight.x)
                || (spany.x <= managers.GameManager.Screen.TopLeft.y && spany.y <= managers.GameManager.Screen.TopLeft.y)
                || (spany.y >= managers.GameManager.Screen.BottomLeft.y && spany.y >= managers.GameManager.Screen.BottomLeft.y);
            return isOut;
        };
        return BitmapGameObject;
    }(createjs.Bitmap));
    objects.BitmapGameObject = BitmapGameObject;
})(objects || (objects = {}));
//# sourceMappingURL=bitmap-game-object.js.map