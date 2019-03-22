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
    var Arrow = /** @class */ (function (_super) {
        __extends(Arrow, _super);
        function Arrow(imageString, vel, scale) {
            if (scale === void 0) { scale = 1; }
            var _this = _super.call(this, imageString, scale, config.Pivot.MIDCENTER) || this;
            _this.move = false;
            _this.recalRegex = false;
            _this.velocity = vel;
            _this.move = true;
            _this.Tag = config.Tags.Arrow;
            _this.Start();
            return _this;
        }
        Arrow.prototype.Start = function () {
        };
        Arrow.prototype.Update = function () {
            if (this.move) {
                this.y += this.velocity.y;
                this.x -= this.velocity.x;
                //this.velocity = new math.Vec2(this.velocity.x, this.velocity.y + 4);
            }
        };
        return Arrow;
    }(objects.BitmapGameObject));
    objects.Arrow = Arrow;
})(objects || (objects = {}));
//# sourceMappingURL=arrow.js.map