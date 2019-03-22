module managers {
    export class ScoreBoard {
        // private instance variables
        private _score: number;
        private _highScore: number;
        private _lifePlayer: number;
        private _lifeEnemy: number;
        private _scoreLabel: objects.Label;
        private _highScoreLabel: objects.Label;
        private _lifeEnemyLabel: objects.Label;
        private _lifePlayerLabel: objects.Label;

        private _isGameOver: boolean;
        // public properties

        get Score(): number {
            return this._score;
        }
        set Score(newValue: number) {
            this._score = newValue;
            this._scoreLabel.text = "Score:" + this._score;
        }
        get HighScore(): number {
            return this._highScore;
        }
        set HighScore(newValue: number) {
            this._highScore = newValue;
            this._highScoreLabel.text = "High Score: " + this._highScoreLabel;
        }
        get LifePlayer(): number {
            return this._lifePlayer;
        }
        set LifePlayer(newValue: number) {
            this._lifePlayer = newValue;
            this._lifePlayerLabel.text = "Player Lives: " + this._lifePlayerLabel;
        }
        get LifeEnemy(): number {
            return this._lifeEnemy;
        }
        set LifeEnemy(newValue: number) {
            this._lifeEnemy = newValue;
        }
        // constructor
        /**
         *Creates an instance of ScoreBoard.
         * @param {boolean} [isGameOver=false]
         * @memberof ScoreBoard
         */
        constructor(_lifePlayer: number = 5, _score: number = 0, _highScore: number = 0, isGameOver: boolean = false) {
            this._isGameOver = isGameOver;
            this.Start();
            if (!isGameOver) {
                this.LifePlayer = _lifePlayer;
                this.Score = _score;
            }
            else {
                this.HighScore = _highScore;
            }
        }
        // private methods
        // public methods
        // Intializing Objects
        public Start(): void {
            if (!this._isGameOver) {
                this._scoreLabel = new objects.Label("Score :9999 ", "30px", "Arial", "#000000", config.Pivot.MIDRIGHT);
                this._lifeEnemyLabel = new objects.Label("Score :9999 ", "30px", "Arial", "#000000", config.Pivot.MIDRIGHT);
                this._lifePlayerLabel = new objects.Label("Score :99", "30px", "Arial", "#000000", config.Pivot.MIDRIGHT);
            }
            else {
                this._highScoreLabel = new objects.Label("Score :9999 ", "30px", "Arial", "#000000", config.Pivot.MIDRIGHT);
            }
            this.Main();

        }
        // Add objects to current scene
        public Main(): void {
            if (!this._isGameOver) {
                managers.GameManager.CurrentScene.addChild(this._scoreLabel);
                managers.GameManager.CurrentScene.addChild(this._lifePlayerLabel);

            }
            else {
                managers.GameManager.CurrentScene.addChild(this._highScoreLabel);
            }


        }
    }
}