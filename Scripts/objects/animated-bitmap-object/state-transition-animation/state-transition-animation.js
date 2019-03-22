var objects;
(function (objects) {
    var AnimatedBitmapObjects;
    (function (AnimatedBitmapObjects) {
        var StateTransitionAnimation = /** @class */ (function () {
            function StateTransitionAnimation(stname, imgs) {
                this.images = [];
                this.stateName = stname;
                this.images = imgs;
            }
            Object.defineProperty(StateTransitionAnimation.prototype, "StateName", {
                get: function () {
                    return this.stateName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StateTransitionAnimation.prototype, "Images", {
                get: function () {
                    return this.images;
                },
                enumerable: true,
                configurable: true
            });
            return StateTransitionAnimation;
        }());
        AnimatedBitmapObjects.StateTransitionAnimation = StateTransitionAnimation;
    })(AnimatedBitmapObjects = objects.AnimatedBitmapObjects || (objects.AnimatedBitmapObjects = {}));
})(objects || (objects = {}));
//# sourceMappingURL=state-transition-animation.js.map