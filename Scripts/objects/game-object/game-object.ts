module objects {
    export abstract class GameObject extends createjs.DisplayObject {

        private _width: number;
        private _height: number;

        private _pivot: config.Pivot;

        get Width(): number {
            return this._width;
        }

        set Width(newWidth: number) {
            this._width = newWidth;
        }

        get HalfWidth(): number {
            return this.Width * 0.5;;
        }

        get Height(): number {
            return this._height;
        }

        set Height(newHeight: number) {
            this._height = newHeight;
        }

        get HalfHeight(): number {
            return this.Height * 0.5;
        }

        /**
         *Creates an instance of Button.
         * @param {string} imageString
         * @param {math.Vec2} pos
         * @param {math.Vec2} pivot
         */
        constructor(imageString: string, pos: math.Vec2 = null,
            pivot: config.Pivot = config.Pivot.MIDCENTER) {
            super();

            this._pivot = pivot;

            if (pos == null) {
                pos = new math.Vec2(0, 0);
            }

            this.Width = this.getBounds().width;
            this.Height = this.getBounds().height;

            this.x = pos.x;
            this.y = pos.y;

            let normPivot = this.GetPivot(pivot);

            this.regX = this.Width * normPivot.x;
            this.regY = this.Height * normPivot.y;
        }

        public abstract Init(): void;

        public abstract Start(): void;

        public abstract Update(): void;

        public abstract Reset(): void;

        public abstract Destroy(): void;

        
        public GetPosition(): math.Vec2 {
            return new math.Vec2(this.x, this.y);
        }

        public SetPosition(pos: math.Vec2): void {
            this.x = pos.x;
            this.y = pos.y;
        }

        public Pivot():config.Pivot{
            return this._pivot;
        }

        private GetPivot(pivot: config.Pivot): math.Vec2 {
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
        }
    }
}