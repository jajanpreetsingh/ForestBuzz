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
    var AnimatedBitmapObject = /** @class */ (function (_super) {
        __extends(AnimatedBitmapObject, _super);
        function AnimatedBitmapObject(imgNames, scale, pivot) {
            if (scale === void 0) { scale = 1; }
            if (pivot === void 0) { pivot = config.Pivot.MIDCENTER; }
            var _this = _super.call(this, imgNames[0], scale, pivot) || this;
            _this.changeTime = 0;
            _this.timeElapsed = 0;
            _this.animSpeed = 17;
            _this.possibleStates = ["default"];
            _this.currentStateIndex = 0;
            _this.currentImageIndex = 0;
            _this.stateAnimations = [];
            _this.AddStateAnimation("default", imgNames);
            return _this;
        }
        Object.defineProperty(AnimatedBitmapObject.prototype, "AllImages", {
            get: function () {
                return this.allImages;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimatedBitmapObject.prototype, "CurrentState", {
            get: function () {
                if (this.stateAnimations.length > this.currentStateIndex)
                    return this.stateAnimations[this.currentStateIndex];
            },
            enumerable: true,
            configurable: true
        });
        AnimatedBitmapObject.prototype.Update = function () {
            this.changeTime = 1 / this.animSpeed;
            this.timeElapsed += 1 / managers.GameManager.Screen.FRAMERATE;
            if (this.timeElapsed >= this.changeTime) {
                ++this.currentImageIndex;
                if (this.currentImageIndex >= this.stateAnimations[this.currentStateIndex].Images.length)
                    this.currentImageIndex = 0;
                this.image = this.CurrentState.Images[this.currentImageIndex].image;
                this.timeElapsed = 0;
            }
        };
        AnimatedBitmapObject.prototype.ChangeState = function (stname) {
            var ind = this.possibleStates.indexOf(stname);
            if (ind < 0 || this.stateAnimations[ind].Images == null || this.stateAnimations[ind].Images.length <= 0)
                return;
            this.currentStateIndex = ind;
            this.currentImageIndex = 0;
        };
        AnimatedBitmapObject.prototype.AddStateAnimation = function (stname, imgNames) {
            var _this = this;
            var images = [];
            imgNames.forEach(function (x) {
                images.push(new objects.BitmapGameObject(x, 1, config.Pivot.MIDCENTER));
            });
            var exist = false;
            this.stateAnimations.forEach(function (x) {
                exist = exist || x.StateName == stname;
            });
            if (exist)
                return;
            if (this.possibleStates.indexOf(stname) < 0)
                this.possibleStates.push(stname);
            this.stateAnimations.push(new objects.AnimatedBitmapObjects.StateAnimation(stname, images));
            if (this.allImages == null || this.allImages == undefined)
                this.allImages = [];
            images.forEach(function (x) {
                _this.allImages.push(x);
                x.alpha = 0.3;
                x.x = _this.x;
                x.y = _this.y;
                x.scaleX = _this.scaleX;
                x.scaleY = _this.scaleY;
                console.log("scale : " + x.scaleX);
            });
        };
        return AnimatedBitmapObject;
    }(objects.BitmapGameObject));
    objects.AnimatedBitmapObject = AnimatedBitmapObject;
})(objects || (objects = {}));
//# sourceMappingURL=animated-bitmap-object.js.map