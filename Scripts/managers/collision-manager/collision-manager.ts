module managers {
    export class CollisionManager {
        public static CheckForBitmaps(go1: objects.BitmapGameObject, go2: objects.BitmapGameObject): boolean {

            let spanX1: math.Vec2 = go1.HorizontalSpan();
            let spanX2: math.Vec2 = go2.HorizontalSpan();

            let spanY1: math.Vec2 = go1.VerticalSpan();
            let spanY2: math.Vec2 = go2.VerticalSpan();

            let collidingX: boolean = false;
            let collidingY: boolean = false;

            let rot1quad = Math.floor((Math.abs(go1.rotation) / 90) % 2);
            let rot2quad = Math.floor((Math.abs(go2.rotation) / 90) % 2);

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

            let colliding = collidingX && collidingY;

            return colliding;
        }


        public static CheckForContainers(go1: objects.ContainerBitmapGameObject, go2: objects.ContainerBitmapGameObject): boolean {

            let spanX1: math.Vec2 = go1.HorizontalSpan();
            let spanX2: math.Vec2 = go2.HorizontalSpan();

            let spanY1: math.Vec2 = go1.VerticalSpan();
            let spanY2: math.Vec2 = go2.VerticalSpan();

            let collidingX: boolean = false;
            let collidingY: boolean = false;

            let rot1quad = Math.floor((Math.abs(go1.rotation) / 90) % 2);
            let rot2quad = Math.floor((Math.abs(go2.rotation) / 90) % 2);

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

            let colliding = collidingX && collidingY;

            return colliding;
        }

        public static CheckForBitmapNContainer(go1: objects.BitmapGameObject, go2: objects.ContainerBitmapGameObject): boolean {

            let spanX1: math.Vec2 = go1.HorizontalSpan();
            let spanX2: math.Vec2 = go2.HorizontalSpan();

            let spanY1: math.Vec2 = go1.VerticalSpan();
            let spanY2: math.Vec2 = go2.VerticalSpan();

            let collidingX: boolean = false;
            let collidingY: boolean = false;

            let rot1quad = Math.floor((Math.abs(go1.rotation) / 90) % 2);
            let rot2quad = Math.floor((Math.abs(go2.rotation) / 90) % 2);

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

            let colliding = collidingX && collidingY;

            return colliding;
        }
        
        public static CheckForBitmapNAnim(go1: objects.BitmapGameObject, go2: objects.AnimatedContainerObject): boolean {

            let spanX1: math.Vec2 = go1.HorizontalSpan();
            let spanX2: math.Vec2 = go2.HorizontalSpan();

            let spanY1: math.Vec2 = go1.VerticalSpan();
            let spanY2: math.Vec2 = go2.VerticalSpan();

            let collidingX: boolean = false;
            let collidingY: boolean = false;

            let rot1quad = Math.floor((Math.abs(go1.rotation) / 90) % 2);
            let rot2quad = Math.floor((Math.abs(go2.rotation) / 90) % 2);

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

            let colliding = collidingX && collidingY;

            return colliding;
        }
    }
}