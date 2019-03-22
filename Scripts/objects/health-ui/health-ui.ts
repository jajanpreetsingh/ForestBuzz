module objects {
    export class HealthBar extends ContainerBitmapGameObject
        implements interfaces.Updatable {

        get Bar(): objects.BitmapGameObject {
            return this.MainImage;
        }
        public redFill: objects.BitmapGameObject;
        public normalFill: objects.BitmapGameObject;

        private minScale: number = 0;
        private maxScale: number = 1.52;
        private currentScale: number = 0;

        private maxValue = 0;
        private readonly redFillPercent = 35;
        private Value: number = 0;

        constructor(names: string[], scale: number = 3, pivot: config.Pivot = config.Pivot.MIDLEFT) {

            super(names[0], scale, pivot);

            this.recalRegex = false;

            this.currentScale = this.maxScale;

            //this.Bar = new objects.BitmapGameObject();
            this.Bar.SetScales(scale, scale / 6);

            this.redFill = new objects.BitmapGameObject(names[2], config.Pivot.MIDLEFT);
            this.addChild(this.redFill);

            this.normalFill = new objects.BitmapGameObject(names[1], config.Pivot.MIDLEFT);
            this.normalFill.scaleY = scale / 4;
            this.normalFill.scaleX = this.currentScale;
            this.addChild(this.normalFill);

            let sc = managers.GameManager.Screen;

            this.normalFill.SetPosition(this.normalFill.Position.AddVec(3500 * sc.UnitX, -1100 * sc.UnitY));
            this.redFill.SetPosition(this.normalFill.Position);

            this.redFill.scaleY = this.normalFill.scaleY;

            this.redFill.scaleX = this.normalFill.scaleX;

            this.maxValue = 100;
            this.Value = this.maxValue;

            this.Update();
        }

        public Update(): void {

            this.redFill.scaleX = this.minScale + ((this.Value / 100) * (this.maxScale - this.minScale));
            this.normalFill.scaleX = this.redFill.scaleX;

            this.redFill.alpha = this.Value < this.GetRedFillValue() ? 1 : 0;
            this.normalFill.alpha = Math.abs(1 - this.redFill.alpha);
        }

        private GetRedFillValue(): number {
            return (this.redFillPercent / 100) * this.maxValue;
        }

        public UpdateValue(val: number): void {
            this.Value = val;
            this.Update();
        }
    }
}