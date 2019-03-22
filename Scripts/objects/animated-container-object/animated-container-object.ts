module objects {
    export class AnimatedContainerObject
        extends createjs.Container
        implements interfaces.Updatable, interfaces.Startable,
        interfaces.Resettable, interfaces.Transition {

        private mainImage: BitmapGameObject;

        get MainImage(): BitmapGameObject {
            return this.mainImage;
        }

        private changeTime: number = 0;
        private timeElapsed: number = 0;

        private animSpeed: number = 30;

        private possibleStates: string[] = ["default"];

        private currentStateIndex: number = 0;

        private currentImageIndex: number = 0;

        private allImages: BitmapGameObject[];

        get AllImages(): BitmapGameObject[] {
            return this.allImages;
        }

        private stateAnimations: objects.AnimatedBitmapObjects.StateAnimation[] = [];

        get CurrentState(): objects.AnimatedBitmapObjects.StateAnimation {
            if (this.stateAnimations.length > this.currentStateIndex)
                return this.stateAnimations[this.currentStateIndex];
        }

        private _pivot: config.Pivot;

        private tag: config.Tags;

        get Tag(): config.Tags {
            return this.tag;
        }

        set Tag(tag: config.Tags) {
            this.tag = tag;
        }

        get OriginalWidth(): number {
            return this.MainImage.getBounds().width;
        }

        get OriginalHeight(): number {
            return this.MainImage.getBounds().height;
        }

        get ActiveWidth(): number {
            return this.OriginalWidth * this.scaleX;
        }

        get ActiveHalfWidth(): number {
            return this.ActiveWidth * 0.5;;
        }

        get ActiveHeight(): number {
            return this.OriginalHeight * this.scaleY;
        }

        get ActiveHalfHeight(): number {
            return this.ActiveHeight * 0.5;
        }

        get Position(): math.Vec2 {
            return new math.Vec2(this.x, this.y);
        }

        get Pivot(): config.Pivot {
            return this._pivot;
        }

        constructor(imgNames: string[], scale: number = 1,
            pivot: config.Pivot = config.Pivot.MIDCENTER) {                

            super();

            this._pivot = pivot;
            this.AddStateAnimation("default", imgNames);

            this.mainImage = this.CurrentState.Images[this.currentImageIndex];

            this.addChild(this.mainImage);

            this.SetScale(scale);
        }

        Start(): void {
        }

        public Update(): void {
            this.changeTime = 1 / this.animSpeed;

            this.timeElapsed += 1 / managers.GameManager.Screen.FRAMERATE

            if (this.timeElapsed >= this.changeTime) {

                ++this.currentImageIndex;

                if (this.currentImageIndex >= this.stateAnimations[this.currentStateIndex].Images.length)
                    this.currentImageIndex = 0;

                this.MainImage.image = this.CurrentState.Images[this.currentImageIndex].image;

                this.timeElapsed = 0;
            }
        }

        public ChangeState(stname: string): void {
            let ind = this.possibleStates.indexOf(stname);
            if (ind < 0 || this.stateAnimations[ind].Images == null || this.stateAnimations[ind].Images.length <= 0)
                return;

            this.currentStateIndex = ind;
            this.currentImageIndex = 0;
        }

        public AddStateAnimation(stname: string, imgNames: string[]): void {
            let images: BitmapGameObject[] = [];

            imgNames.forEach(x => {
                images.push(new BitmapGameObject(x, 1, config.Pivot.MIDCENTER));
            });

            let exist: boolean = false;
            this.stateAnimations.forEach(x => {
                exist = exist || x.StateName == stname
            });

            if (exist)
                return;

            if (this.possibleStates.indexOf(stname) < 0)
                this.possibleStates.push(stname);

            this.stateAnimations.push(new objects.AnimatedBitmapObjects.StateAnimation(stname, images));

            if (this.allImages == null || this.allImages == undefined)
                this.allImages = [];

                images.forEach(x => {
                this.allImages.push(x);
                x.x = this.x;
                x.y = this.y;
                x.scaleX = this.scaleX;
                x.scaleY = this.scaleY;
            });
        }


        Reset(): void {
        }



        public SetPosition(pos: math.Vec2): void {
            this.x = pos.x;
            this.y = pos.y;
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

        public SetScale(value: number): void {
            this.scaleX = this.scaleY = value;

            this.CalculateRegex();
        }

        private CalculateRegex(): void {
            let normPivot = this.GetPivot(this._pivot);

             this.regX = this.ActiveWidth * normPivot.x;
             this.regY = this.ActiveHeight * normPivot.y;
        }

        public SetScales(valueX: number, valueY: number): void {
            this.scaleX = valueX;
            this.scaleY = valueY;

            this.CalculateRegex();
        }

        public HorizontalSpan(): math.Vec2 {

            let result: math.Vec2 = new math.Vec2(0.5, 0.5);

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
        }

        public VerticalSpan(): math.Vec2 {

            let result: math.Vec2 = new math.Vec2(0.5, 0.5);

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
        }

        public IsOutOfScreen(): boolean {

            let spanx = this.HorizontalSpan();
            let spany = this.VerticalSpan();

            let isOut: boolean =
                (spanx.x <= managers.GameManager.Screen.MidLeft.x && spanx.y <= managers.GameManager.Screen.MidLeft.x)

                || (spanx.x >= managers.GameManager.Screen.MidRight.x && spanx.y >= managers.GameManager.Screen.MidRight.x)

                || (spany.x <= managers.GameManager.Screen.TopLeft.y && spany.y <= managers.GameManager.Screen.TopLeft.y)

                || (spany.y >= managers.GameManager.Screen.BottomLeft.y && spany.y >= managers.GameManager.Screen.BottomLeft.y);

            return isOut;
        }
    }
}