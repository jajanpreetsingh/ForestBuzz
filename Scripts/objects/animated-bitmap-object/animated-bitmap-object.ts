module objects {
    export class AnimatedBitmapObject
        extends objects.BitmapGameObject
        implements interfaces.Updatable, interfaces.Startable,
        interfaces.Resettable, interfaces.Transition {

        private changeTime: number = 0;
        private timeElapsed: number = 0;

        private animSpeed: number = 17;

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

        constructor(imgNames: string[], scale: number = 1,
            pivot: config.Pivot = config.Pivot.MIDCENTER) {

            super(imgNames[0], scale, pivot);

            this.AddStateAnimation("default", imgNames);
        }

        public Update(): void {
            this.changeTime = 1 / this.animSpeed;

            this.timeElapsed += 1 / managers.GameManager.Screen.FRAMERATE

            if (this.timeElapsed >= this.changeTime) {

                ++this.currentImageIndex;

                if (this.currentImageIndex >= this.stateAnimations[this.currentStateIndex].Images.length)
                    this.currentImageIndex = 0;

                this.image = this.CurrentState.Images[this.currentImageIndex].image;

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
                x.alpha = 0.3;
                x.x = this.x;
                x.y = this.y;
                x.scaleX = this.scaleX;
                x.scaleY = this.scaleY;
                console.log("scale : " + x.scaleX);
            });
        }
    }
}