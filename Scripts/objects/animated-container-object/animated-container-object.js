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
    var AnimatedContainerObject = /** @class */ (function (_super) {
        __extends(AnimatedContainerObject, _super);
        function AnimatedContainerObject(imgNames, scale, pivot) {
            if (scale === void 0) { scale = 1; }
            if (pivot === void 0) { pivot = config.Pivot.MIDCENTER; }
            var _this = _super.call(this) || this;
            _this.changeTime = 0;
            _this.timeElapsed = 0;
            _this.animSpeed = 30;
            _this.possibleStates = ["default"];
            _this.currentStateIndex = 0;
            _this.currentImageIndex = 0;
            _this.stateAnimations = [];
            _this._pivot = pivot;
            _this.AddStateAnimation("default", imgNames);
            _this.mainImage = _this.CurrentState.Images[_this.currentImageIndex];
            _this.addChild(_this.mainImage);
            _this.SetScale(scale);
            return _this;
        }
        Object.defineProperty(AnimatedContainerObject.prototype, "MainImage", {
            get: function () {
                return this.mainImage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimatedContainerObject.prototype, "AllImages", {
            get: function () {
                return this.allImages;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimatedContainerObject.prototype, "CurrentState", {
            get: function () {
                if (this.stateAnimations.length > this.currentStateIndex)
                    return this.stateAnimations[this.currentStateIndex];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimatedContainerObject.prototype, "Tag", {
            get: function () {
                return this.tag;
            },
            set: function (tag) {
                this.tag = tag;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimatedContainerObject.prototype, "OriginalWidth", {
            get: function () {
                return this.MainImage.getBounds().width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimatedContainerObject.prototype, "OriginalHeight", {
            get: function () {
                return this.MainImage.getBounds().height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimatedContainerObject.prototype, "ActiveWidth", {
            get: function () {
                return this.OriginalWidth * this.scaleX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimatedContainerObject.prototype, "ActiveHalfWidth", {
            get: function () {
                return this.ActiveWidth * 0.5;
                ;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimatedContainerObject.prototype, "ActiveHeight", {
            get: function () {
                return this.OriginalHeight * this.scaleY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimatedContainerObject.prototype, "ActiveHalfHeight", {
            get: function () {
                return this.ActiveHeight * 0.5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimatedContainerObject.prototype, "Position", {
            get: function () {
                return new math.Vec2(this.x, this.y);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimatedContainerObject.prototype, "Pivot", {
            get: function () {
                return this._pivot;
            },
            enumerable: true,
            configurable: true
        });
        AnimatedContainerObject.prototype.Start = function () {
        };
        AnimatedContainerObject.prototype.Update = function () {
            this.changeTime = 1 / this.animSpeed;
            this.timeElapsed += 1 / managers.GameManager.Screen.FRAMERATE;
            if (this.timeElapsed >= this.changeTime) {
                ++this.currentImageIndex;
                if (this.currentImageIndex >= this.stateAnimations[this.currentStateIndex].Images.length)
                    this.currentImageIndex = 0;
                this.MainImage.image = this.CurrentState.Images[this.currentImageIndex].image;
                this.timeElapsed = 0;
            }
        };
        AnimatedContainerObject.prototype.ChangeState = function (stname) {
            var ind = this.possibleStates.indexOf(stname);
            if (ind < 0 || this.stateAnimations[ind].Images == null || this.stateAnimations[ind].Images.length <= 0)
                return;
            this.currentStateIndex = ind;
            this.currentImageIndex = 0;
        };
        AnimatedContainerObject.prototype.AddStateAnimation = function (stname, imgNames) {
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
                x.x = _this.x;
                x.y = _this.y;
                x.scaleX = _this.scaleX;
                x.scaleY = _this.scaleY;
            });
        };
        AnimatedContainerObject.prototype.Reset = function () {
        };
        AnimatedContainerObject.prototype.SetPosition = function (pos) {
            this.x = pos.x;
            this.y = pos.y;
        };
        AnimatedContainerObject.prototype.GetPivot = function (pivot) {
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
        AnimatedContainerObject.prototype.SetScale = function (value) {
            this.scaleX = this.scaleY = value;
            this.CalculateRegex();
        };
        AnimatedContainerObject.prototype.CalculateRegex = function () {
            var normPivot = this.GetPivot(this._pivot);
            this.regX = this.ActiveWidth * normPivot.x;
            this.regY = this.ActiveHeight * normPivot.y;
        };
        AnimatedContainerObject.prototype.SetScales = function (valueX, valueY) {
            this.scaleX = valueX;
            this.scaleY = valueY;
            this.CalculateRegex();
        };
        AnimatedContainerObject.prototype.HorizontalSpan = function () {
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
        AnimatedContainerObject.prototype.VerticalSpan = function () {
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
        AnimatedContainerObject.prototype.IsOutOfScreen = function () {
            var spanx = this.HorizontalSpan();
            var spany = this.VerticalSpan();
            var isOut = (spanx.x <= managers.GameManager.Screen.MidLeft.x && spanx.y <= managers.GameManager.Screen.MidLeft.x)
                || (spanx.x >= managers.GameManager.Screen.MidRight.x && spanx.y >= managers.GameManager.Screen.MidRight.x)
                || (spany.x <= managers.GameManager.Screen.TopLeft.y && spany.y <= managers.GameManager.Screen.TopLeft.y)
                || (spany.y >= managers.GameManager.Screen.BottomLeft.y && spany.y >= managers.GameManager.Screen.BottomLeft.y);
            return isOut;
        };
        return AnimatedContainerObject;
    }(createjs.Container));
    objects.AnimatedContainerObject = AnimatedContainerObject;
})(objects || (objects = {}));
//# sourceMappingURL=animated-container-object.js.map