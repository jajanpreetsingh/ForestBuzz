module objects.AnimatedBitmapObjects {
    export class StateAnimation {

        private stateName: string;
        private images: BitmapGameObject[] = [];

        get StateName(): string {
            return this.stateName;
        }

        get Images(): BitmapGameObject[] {
            
            return this.images;
        }

        private transitionStates: StateTransitionAnimation[] = [];

        constructor(stname: string, imgs: objects.BitmapGameObject[]) {
            this.stateName = stname;
            this.images = imgs;
        }

        public AddTransition(stname: string, imgs: objects.BitmapGameObject[]): void {

            let exist: boolean = false;
            this.transitionStates.forEach(x => {
                exist = exist || x.StateName == this.stateName
            });

            if (exist)
                return;

            this.transitionStates.push(new objects.AnimatedBitmapObjects.StateTransitionAnimation(stname, imgs));
        }
    }
}