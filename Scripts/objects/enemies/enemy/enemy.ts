module objects {
    export class Enemy extends objects.ContainerBitmapGameObject
        implements interfaces.HealthUIUpdatable {

        healthUI: HealthBar;

        private maxHealth: number;
        private health: number;

        get MaxHealth(): number {
            return this.maxHealth;
        }

        get Health(): number {
            return this.health;
        }

        constructor(imageString: string, scale: number = 1,
            pivot: config.Pivot = config.Pivot.MIDCENTER) {

            super(imageString, scale, pivot);

            //this.Tag = config.Tags.Enemy;

            this.Start();
        }

        public InitEnemyHealth(maxHealth: number): void {
            this.maxHealth = maxHealth;
            this.health = this.maxHealth;
        }

        public Start(): void {
        }

        public Update(): void {
        }

        public Damage(damage: number): void {
            if (this.Health <= 0) {
                return;
            }

            if (this.Health < damage)
                this.health = 0;

            this.health -= damage;

            this.UpdateHealthUI();
        }


        UpdateHealthUI(): void {
        }
    }
}