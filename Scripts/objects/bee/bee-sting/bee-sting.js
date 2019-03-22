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
    var BeeSting = /** @class */ (function (_super) {
        __extends(BeeSting, _super);
        function BeeSting() {
            var _this = _super.call(this, "sting", 0.5, config.Pivot.TOPCENTER) || this;
            _this.speed = 150;
            _this.rotation = -25;
            return _this;
        }
        BeeSting.prototype.Update = function () {
            this.x += this.speed * Math.cos(30);
            this.y += this.speed * Math.cos(30);
        };
        return BeeSting;
    }(objects.BitmapGameObject));
    objects.BeeSting = BeeSting;
})(objects || (objects = {}));
//# sourceMappingURL=bee-sting.js.map