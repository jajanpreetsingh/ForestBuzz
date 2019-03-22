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
    var ContainerBitmapGameObject = /** @class */ (function (_super) {
        __extends(ContainerBitmapGameObject, _super);
        function ContainerBitmapGameObject(imageString, scale, pivot) {
            if (scale === void 0) { scale = 1; }
            if (pivot === void 0) { pivot = config.Pivot.MIDCENTER; }
            var _this = _super.call(this) || this;
            _this.recalRegex = true;
            _this.mainImage = new objects.BitmapGameObject(imageString, 1, pivot);
            _this.addChild(_this.mainImage);
            _this.SetScale(scale);
            _this.CalculateRegex();
            _this.Init();
            return _this;
        }
        Object.defineProperty(ContainerBitmapGameObject.prototype, "Tag", {
            get: function () {
                return this.tag;
            },
            set: function (tag) {
                this.tag = tag;
                this.MainImage.Tag = tag;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContainerBitmapGameObject.prototype, "MainImage", {
            get: function () {
                return this.mainImage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContainerBitmapGameObject.prototype, "ActiveWidth", {
            get: function () {
                return this.MainImage.ActiveWidth * this.scaleX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContainerBitmapGameObject.prototype, "ActiveHalfWidth", {
            get: function () {
                return this.ActiveWidth * 0.5;
                ;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContainerBitmapGameObject.prototype, "ActiveHeight", {
            get: function () {
                return this.MainImage.ActiveHeight * this.scaleY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContainerBitmapGameObject.prototype, "ActiveHalfHeight", {
            get: function () {
                return this.ActiveHeight * 0.5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContainerBitmapGameObject.prototype, "Pivot", {
            get: function () {
                return this.MainImage.Pivot;
            },
            enumerable: true,
            configurable: true
        });
        ContainerBitmapGameObject.prototype.CalculateRegex = function () {
            var normPivot = this.GetPivot(this.Pivot);
            if (!this.recalRegex)
                return;
            this.regX = this.ActiveWidth * normPivot.x;
            this.regY = this.ActiveHeight * normPivot.y;
        };
        ContainerBitmapGameObject.prototype.Init = function () {
        };
        ContainerBitmapGameObject.prototype.Start = function () {
        };
        ContainerBitmapGameObject.prototype.Update = function () {
        };
        ContainerBitmapGameObject.prototype.Reset = function () {
        };
        ContainerBitmapGameObject.prototype.Destroy = function () {
        };
        Object.defineProperty(ContainerBitmapGameObject.prototype, "Position", {
            get: function () {
                return new math.Vec2(this.x, this.y);
            },
            enumerable: true,
            configurable: true
        });
        ContainerBitmapGameObject.prototype.SetPosition = function (pos) {
            this.x = pos.x;
            this.y = pos.y;
        };
        ContainerBitmapGameObject.prototype.SetScale = function (value) {
            this.scaleX = this.scaleY = value;
            this.CalculateRegex();
        };
        ContainerBitmapGameObject.prototype.SetScales = function (valueX, valueY) {
            this.scaleX = valueX;
            this.scaleY = valueY;
            this.CalculateRegex();
        };
        ContainerBitmapGameObject.prototype.HorizontalSpan = function () {
            var result;
            switch (this.Pivot) {
                case config.Pivot.BOTTOMLEFT:
                case config.Pivot.MIDLEFT:
                case config.Pivot.TOPLEFT:
                    result = new math.Vec2(this.x + this.MainImage.x, this.x + this.MainImage.x + this.ActiveWidth);
                    break;
                case config.Pivot.BOTTOMCENTER:
                case config.Pivot.MIDCENTER:
                case config.Pivot.TOPCENTER:
                    result = new math.Vec2(this.x + this.MainImage.x - this.ActiveHalfWidth, this.x + this.MainImage.x + this.ActiveHalfWidth);
                    break;
                case config.Pivot.BOTTOMRIGHT:
                case config.Pivot.MIDRIGHT:
                case config.Pivot.TOPRIGHT:
                    result = new math.Vec2(this.x + this.MainImage.x - this.ActiveWidth, this.x + this.MainImage.x);
                    break;
            }
            return result.SortCordinates();
        };
        ContainerBitmapGameObject.prototype.VerticalSpan = function () {
            var result;
            switch (this.Pivot) {
                case config.Pivot.BOTTOMLEFT:
                case config.Pivot.BOTTOMCENTER:
                case config.Pivot.BOTTOMRIGHT:
                    result = new math.Vec2(this.y + this.MainImage.y - this.ActiveHeight, this.y + this.MainImage.y);
                    break;
                case config.Pivot.MIDLEFT:
                case config.Pivot.MIDCENTER:
                case config.Pivot.MIDRIGHT:
                    result = new math.Vec2(this.y + this.MainImage.y - this.ActiveHalfHeight, this.y + this.MainImage.y + this.ActiveHalfHeight);
                    break;
                case config.Pivot.TOPLEFT:
                case config.Pivot.TOPCENTER:
                case config.Pivot.TOPRIGHT:
                    result = new math.Vec2(this.y + this.MainImage.y, this.y + this.MainImage.y + this.ActiveHeight);
                    break;
            }
            return result.SortCordinates();
        };
        ContainerBitmapGameObject.prototype.GetPivot = function (pivot) {
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
        return ContainerBitmapGameObject;
    }(createjs.Container));
    objects.ContainerBitmapGameObject = ContainerBitmapGameObject;
})(objects || (objects = {}));
//# sourceMappingURL=container-bitmap-object.js.map