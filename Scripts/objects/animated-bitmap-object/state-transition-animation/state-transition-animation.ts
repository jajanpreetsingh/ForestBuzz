module objects.AnimatedBitmapObjects {
    export class StateTransitionAnimation {

        private stateName: string;
        private images: BitmapGameObject[] = [];

        get StateName(): string {
            return this.stateName;
        }

        get Images(): BitmapGameObject[] {
            return this.images;
        }

        constructor(stname: string, imgs: objects.BitmapGameObject[]) {
            this.stateName = stname;
            this.images = imgs;
        }
    }
}