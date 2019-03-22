module interfaces {
    export interface HealthUIUpdatable {

        healthUI: objects.HealthBar;

        UpdateHealthUI(): void;
    }
}