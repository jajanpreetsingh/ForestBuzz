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
    var GameObject = /** @class */ (function (_super) {
        __extends(GameObject, _super);
        /**
         *Creates an instance of Button.
         * @param {string} imageString
         * @param {math.Vec2} pos
         * @param {math.Vec2} pivot
         */
        function GameObject(imageString, pos, pivot) {
            if (pos === void 0) { pos = null; }
            if (pivot === void 0) { pivot = config.Pivot.MIDCENTER; }
            var _this = _super.call(this) || this;
            _this._pivot = pivot;
            if (pos == null) {
                pos = new math.Vec2(0, 0);
            }
            _this.Width = _this.getBounds().width;
            _this.Height = _this.getBounds().height;
            _this.x = pos.x;
            _this.y = pos.y;
            var normPivot = _this.GetPivot(pivot);
            _this.regX = _this.Width * normPivot.x;
            _this.regY = _this.Height * normPivot.y;
            return _this;
        }
        Object.defineProperty(GameObject.prototype, "Width", {
            get: function () {
                return this._width;
            },
            set: function (newWidth) {
                this._width = newWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "HalfWidth", {
            get: function () {
                return this.Width * 0.5;
                ;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "Height", {
            get: function () {
                return this._height;
            },
            set: function (newHeight) {
                this._height = newHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "HalfHeight", {
            get: function () {
                return this.Height * 0.5;
            },
            enumerable: true,
            configurable: true
        });
        GameObject.prototype.GetPosition = function () {
            return new math.Vec2(this.x, this.y);
        };
        GameObject.prototype.SetPosition = function (pos) {
            this.x = pos.x;
            this.y = pos.y;
        };
        GameObject.prototype.Pivot = function () {
            return this._pivot;
        };
        GameObject.prototype.GetPivot = function (pivot) {
            switch (pivot) {
                case config.Pivot.BOTTOMCENTER:
                    return new math.Vec2(0.5, 0);
                case config.Pivot.BOTTOMLEFT:
                    return new math.Vec2(0, 0);
                case config.Pivot.BOTTOMRIGHT:
                    return new math.Vec2(1, 0);
                case config.Pivot.MIDCENTER:
                    return new math.Vec2(0.5, 0.5);
                case config.Pivot.MIDLEFT:
                    return new math.Vec2(0, 0.5);
                case config.Pivot.MIDRIGHT:
                    return new math.Vec2(1, 0.5);
                case config.Pivot.TOPCENTER:
                    return new math.Vec2(0.5, 1);
                case config.Pivot.TOPLEFT:
                    return new math.Vec2(0, 1);
                case config.Pivot.TOPRIGHT:
                    return new math.Vec2(1, 1);
            }
        };
        return GameObject;
    }(createjs.DisplayObject));
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=game-object.js.map