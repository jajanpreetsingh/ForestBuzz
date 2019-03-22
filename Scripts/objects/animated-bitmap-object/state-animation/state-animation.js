var objects;
(function (objects) {
    var AnimatedBitmapObjects;
    (function (AnimatedBitmapObjects) {
        var StateAnimation = /** @class */ (function () {
            function StateAnimation(stname, imgs) {
                this.images = [];
                this.transitionStates = [];
                this.stateName = stname;
                this.images = imgs;
            }
            Object.defineProperty(StateAnimation.prototype, "StateName", {
                get: function () {
                    return this.stateName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StateAnimation.prototype, "Images", {
                get: function () {
                    return this.images;
                },
                enumerable: true,
                configurable: true
            });
            StateAnimation.prototype.AddTransition = function (stname, imgs) {
                var _this = this;
                var exist = false;
                this.transitionStates.forEach(function (x) {
                    exist = exist || x.StateName == _this.stateName;
                });
                if (exist)
                    return;
                this.transitionStates.push(new objects.AnimatedBitmapObjects.StateTransitionAnimation(stname, imgs));
            };
            return StateAnimation;
        }());
        AnimatedBitmapObjects.StateAnimation = StateAnimation;
    })(AnimatedBitmapObjects = objects.AnimatedBitmapObjects || (objects.AnimatedBitmapObjects = {}));
})(objects || (objects = {}));
//# sourceMappingURL=state-animation.js.map