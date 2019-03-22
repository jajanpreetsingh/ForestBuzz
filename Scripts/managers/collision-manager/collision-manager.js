var managers;
(function (managers) {
    var CollisionManager = /** @class */ (function () {
        function CollisionManager() {
        }
        CollisionManager.CheckForBitmaps = function (go1, go2) {
            var spanX1 = go1.HorizontalSpan();
            var spanX2 = go2.HorizontalSpan();
            var spanY1 = go1.VerticalSpan();
            var spanY2 = go2.VerticalSpan();
            var collidingX = false;
            var collidingY = false;
            var rot1quad = Math.floor((Math.abs(go1.rotation) / 90) % 2);
            var rot2quad = Math.floor((Math.abs(go2.rotation) / 90) % 2);
            if (rot1quad == rot2quad) {
                collidingX = utility.Utility.IsBetween(spanX1.x, spanX2.x, spanX2.y)
                    || utility.Utility.IsBetween(spanX1.y, spanX2.x, spanX2.y)
                    || utility.Utility.IsBetween(spanX2.x, spanX1.x, spanX1.y)
                    || utility.Utility.IsBetween(spanX2.y, spanX1.x, spanX1.y);
                collidingY = utility.Utility.IsBetween(spanY1.x, spanY2.x, spanY2.y)
                    || utility.Utility.IsBetween(spanY1.y, spanY2.x, spanY2.y)
                    || utility.Utility.IsBetween(spanY2.x, spanY1.x, spanY1.y)
                    || utility.Utility.IsBetween(spanY2.y, spanY1.x, spanY1.y);
            }
            else {
                collidingX = utility.Utility.IsBetween(spanX1.x, spanY2.x, spanY2.y)
                    || utility.Utility.IsBetween(spanX1.y, spanY2.x, spanY2.y)
                    || utility.Utility.IsBetween(spanX2.x, spanY1.x, spanY1.y)
                    || utility.Utility.IsBetween(spanX2.y, spanY1.x, spanY1.y);
                collidingY = utility.Utility.IsBetween(spanY1.x, spanX2.x, spanX2.y)
                    || utility.Utility.IsBetween(spanY1.y, spanX2.x, spanX2.y)
                    || utility.Utility.IsBetween(spanY2.x, spanX1.x, spanX1.y)
                    || utility.Utility.IsBetween(spanY2.y, spanX1.x, spanX1.y);
            }
            var colliding = collidingX && collidingY;
            return colliding;
        };
        CollisionManager.CheckForContainers = function (go1, go2) {
            var spanX1 = go1.HorizontalSpan();
            var spanX2 = go2.HorizontalSpan();
            var spanY1 = go1.VerticalSpan();
            var spanY2 = go2.VerticalSpan();
            var collidingX = false;
            var collidingY = false;
            var rot1quad = Math.floor((Math.abs(go1.rotation) / 90) % 2);
            var rot2quad = Math.floor((Math.abs(go2.rotation) / 90) % 2);
            if (rot1quad == rot2quad) {
                collidingX = utility.Utility.IsBetween(spanX1.x, spanX2.x, spanX2.y)
                    || utility.Utility.IsBetween(spanX1.y, spanX2.x, spanX2.y)
                    || utility.Utility.IsBetween(spanX2.x, spanX1.x, spanX1.y)
                    || utility.Utility.IsBetween(spanX2.y, spanX1.x, spanX1.y);
                collidingY = utility.Utility.IsBetween(spanY1.x, spanY2.x, spanY2.y)
                    || utility.Utility.IsBetween(spanY1.y, spanY2.x, spanY2.y)
                    || utility.Utility.IsBetween(spanY2.x, spanY1.x, spanY1.y)
                    || utility.Utility.IsBetween(spanY2.y, spanY1.x, spanY1.y);
            }
            else {
                collidingX = utility.Utility.IsBetween(spanX1.x, spanY2.x, spanY2.y)
                    || utility.Utility.IsBetween(spanX1.y, spanY2.x, spanY2.y)
                    || utility.Utility.IsBetween(spanX2.x, spanY1.x, spanY1.y)
                    || utility.Utility.IsBetween(spanX2.y, spanY1.x, spanY1.y);
                collidingY = utility.Utility.IsBetween(spanY1.x, spanX2.x, spanX2.y)
                    || utility.Utility.IsBetween(spanY1.y, spanX2.x, spanX2.y)
                    || utility.Utility.IsBetween(spanY2.x, spanX1.x, spanX1.y)
                    || utility.Utility.IsBetween(spanY2.y, spanX1.x, spanX1.y);
            }
            var colliding = collidingX && collidingY;
            return colliding;
        };
        CollisionManager.CheckForBitmapNContainer = function (go1, go2) {
            var spanX1 = go1.HorizontalSpan();
            var spanX2 = go2.HorizontalSpan();
            var spanY1 = go1.VerticalSpan();
            var spanY2 = go2.VerticalSpan();
            var collidingX = false;
            var collidingY = false;
            var rot1quad = Math.floor((Math.abs(go1.rotation) / 90) % 2);
            var rot2quad = Math.floor((Math.abs(go2.rotation) / 90) % 2);
            if (rot1quad == rot2quad) {
                collidingX = utility.Utility.IsBetween(spanX1.x, spanX2.x, spanX2.y)
                    || utility.Utility.IsBetween(spanX1.y, spanX2.x, spanX2.y)
                    || utility.Utility.IsBetween(spanX2.x, spanX1.x, spanX1.y)
                    || utility.Utility.IsBetween(spanX2.y, spanX1.x, spanX1.y);
                collidingY = utility.Utility.IsBetween(spanY1.x, spanY2.x, spanY2.y)
                    || utility.Utility.IsBetween(spanY1.y, spanY2.x, spanY2.y)
                    || utility.Utility.IsBetween(spanY2.x, spanY1.x, spanY1.y)
                    || utility.Utility.IsBetween(spanY2.y, spanY1.x, spanY1.y);
            }
            else {
                collidingX = utility.Utility.IsBetween(spanX1.x, spanY2.x, spanY2.y)
                    || utility.Utility.IsBetween(spanX1.y, spanY2.x, spanY2.y)
                    || utility.Utility.IsBetween(spanX2.x, spanY1.x, spanY1.y)
                    || utility.Utility.IsBetween(spanX2.y, spanY1.x, spanY1.y);
                collidingY = utility.Utility.IsBetween(spanY1.x, spanX2.x, spanX2.y)
                    || utility.Utility.IsBetween(spanY1.y, spanX2.x, spanX2.y)
                    || utility.Utility.IsBetween(spanY2.x, spanX1.x, spanX1.y)
                    || utility.Utility.IsBetween(spanY2.y, spanX1.x, spanX1.y);
            }
            var colliding = collidingX && collidingY;
            return colliding;
        };
        CollisionManager.CheckForBitmapNAnim = function (go1, go2) {
            var spanX1 = go1.HorizontalSpan();
            var spanX2 = go2.HorizontalSpan();
            var spanY1 = go1.VerticalSpan();
            var spanY2 = go2.VerticalSpan();
            var collidingX = false;
            var collidingY = false;
            var rot1quad = Math.floor((Math.abs(go1.rotation) / 90) % 2);
            var rot2quad = Math.floor((Math.abs(go2.rotation) / 90) % 2);
            if (rot1quad == rot2quad) {
                collidingX = utility.Utility.IsBetween(spanX1.x, spanX2.x, spanX2.y)
                    || utility.Utility.IsBetween(spanX1.y, spanX2.x, spanX2.y)
                    || utility.Utility.IsBetween(spanX2.x, spanX1.x, spanX1.y)
                    || utility.Utility.IsBetween(spanX2.y, spanX1.x, spanX1.y);
                collidingY = utility.Utility.IsBetween(spanY1.x, spanY2.x, spanY2.y)
                    || utility.Utility.IsBetween(spanY1.y, spanY2.x, spanY2.y)
                    || utility.Utility.IsBetween(spanY2.x, spanY1.x, spanY1.y)
                    || utility.Utility.IsBetween(spanY2.y, spanY1.x, spanY1.y);
            }
            else {
                collidingX = utility.Utility.IsBetween(spanX1.x, spanY2.x, spanY2.y)
                    || utility.Utility.IsBetween(spanX1.y, spanY2.x, spanY2.y)
                    || utility.Utility.IsBetween(spanX2.x, spanY1.x, spanY1.y)
                    || utility.Utility.IsBetween(spanX2.y, spanY1.x, spanY1.y);
                collidingY = utility.Utility.IsBetween(spanY1.x, spanX2.x, spanX2.y)
                    || utility.Utility.IsBetween(spanY1.y, spanX2.x, spanX2.y)
                    || utility.Utility.IsBetween(spanY2.x, spanX1.x, spanX1.y)
                    || utility.Utility.IsBetween(spanY2.y, spanX1.x, spanX1.y);
            }
            var colliding = collidingX && collidingY;
            return colliding;
        };
        return CollisionManager;
    }());
    managers.CollisionManager = CollisionManager;
})(managers || (managers = {}));
//# sourceMappingURL=collision-manager.js.map