module objects {
    export class ContainerBitmapGameObject extends createjs.Container {

        private mainImage: BitmapGameObject;

        public recalRegex: boolean = true;

        private tag: config.Tags;

        get Tag(): config.Tags {
            return this.tag;
        }

        set Tag(tag: config.Tags) {
            this.tag = tag;
            this.MainImage.Tag = tag;
        }

        get MainImage(): BitmapGameObject {
            return this.mainImage;
        }

        get ActiveWidth(): number {
            return this.MainImage.ActiveWidth * this.scaleX;
        }

        get ActiveHalfWidth(): number {
            return this.ActiveWidth * 0.5;;
        }

        get ActiveHeight(): number {
            return this.MainImage.ActiveHeight * this.scaleY;
        }

        get ActiveHalfHeight(): number {
            return this.ActiveHeight * 0.5;
        }

        get Pivot(): config.Pivot {
            return this.MainImage.Pivot;
        }

        constructor(imageString: string, scale: number = 1,
            pivot: config.Pivot = config.Pivot.MIDCENTER) {

            super();

            this.mainImage = new BitmapGameObject(imageString, 1, pivot);

            this.addChild(this.mainImage);

            this.SetScale(scale);

            this.CalculateRegex();

            this.Init();
        }

        CalculateRegex(): void {
            let normPivot = this.GetPivot(this.Pivot);

            if (!this.recalRegex)
                return;

            this.regX = this.ActiveWidth * normPivot.x;
            this.regY = this.ActiveHeight * normPivot.y;
        }

        private Init(): void {
        }

        public Start(): void {

        }

        public Update(): void {
        }

        public Reset(): void {
        }

        public Destroy(): void {
        }

        get Position(): math.Vec2 {
            return new math.Vec2(this.x, this.y);
        }

        public SetPosition(pos: math.Vec2): void {
            this.x = pos.x;
            this.y = pos.y;
        }

        public SetScale(value: number): void {
            this.scaleX = this.scaleY = value;
            this.CalculateRegex();
        }

        public SetScales(valueX: number, valueY: number): void {
            this.scaleX = valueX;
            this.scaleY = valueY;

            this.CalculateRegex();
        }

        public HorizontalSpan(): math.Vec2 {

            let result: math.Vec2;

            switch (this.Pivot) {

                case config.Pivot.BOTTOMLEFT:
                case config.Pivot.MIDLEFT:
                case config.Pivot.TOPLEFT:

                    result = new math.Vec2(this.x + this.MainImage.x, this.x + this.MainImage.x + this.ActiveWidth);

                    break;

                case config.Pivot.BOTTOMCENTER:
                case config.Pivot.MIDCENTER:
                case config.Pivot.TOPCENTER:

                    result = new math.Vec2(this.x + this.MainImage.x - this.ActiveHalfWidth,
                        this.x + this.MainImage.x + this.ActiveHalfWidth);

                    break;

                case config.Pivot.BOTTOMRIGHT:
                case config.Pivot.MIDRIGHT:
                case config.Pivot.TOPRIGHT:

                    result = new math.Vec2(this.x + this.MainImage.x - this.ActiveWidth,
                        this.x + this.MainImage.x);
                    break;
            }

            return result.SortCordinates();
        }

        public VerticalSpan(): math.Vec2 {

            let result: math.Vec2;

            switch (this.Pivot) {

                case config.Pivot.BOTTOMLEFT:
                case config.Pivot.BOTTOMCENTER:
                case config.Pivot.BOTTOMRIGHT:

                    result = new math.Vec2(this.y + this.MainImage.y - this.ActiveHeight, this.y + this.MainImage.y);

                    break;

                case config.Pivot.MIDLEFT:
                case config.Pivot.MIDCENTER:
                case config.Pivot.MIDRIGHT:

                    result = new math.Vec2(this.y + this.MainImage.y - this.ActiveHalfHeight,
                        this.y + this.MainImage.y + this.ActiveHalfHeight);

                    break;

                case config.Pivot.TOPLEFT:
                case config.Pivot.TOPCENTER:
                case config.Pivot.TOPRIGHT:

                    result = new math.Vec2(this.y + this.MainImage.y, this.y + this.MainImage.y + this.ActiveHeight);
                    break;
            }

            return result.SortCordinates();
        }

        private GetPivot(pivot: config.Pivot): math.Vec2 {
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
        }
    }
}