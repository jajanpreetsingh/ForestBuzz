var managers;
(function (managers) {
    var ScoreBoard = /** @class */ (function () {
        // constructor
        /**
         *Creates an instance of ScoreBoard.
         * @param {boolean} [isGameOver=false]
         * @memberof ScoreBoard
         */
        function ScoreBoard(_lifePlayer, _score, _highScore, isGameOver) {
            if (_lifePlayer === void 0) { _lifePlayer = 5; }
            if (_score === void 0) { _score = 0; }
            if (_highScore === void 0) { _highScore = 0; }
            if (isGameOver === void 0) { isGameOver = false; }
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
        Object.defineProperty(ScoreBoard.prototype, "Score", {
            // public properties
            get: function () {
                return this._score;
            },
            set: function (newValue) {
                this._score = newValue;
                this._scoreLabel.text = "Score:" + this._score;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "HighScore", {
            get: function () {
                return this._highScore;
            },
            set: function (newValue) {
                this._highScore = newValue;
                this._highScoreLabel.text = "High Score: " + this._highScoreLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "LifePlayer", {
            get: function () {
                return this._lifePlayer;
            },
            set: function (newValue) {
                this._lifePlayer = newValue;
                this._lifePlayerLabel.text = "Player Lives: " + this._lifePlayerLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "LifeEnemy", {
            get: function () {
                return this._lifeEnemy;
            },
            set: function (newValue) {
                this._lifeEnemy = newValue;
            },
            enumerable: true,
            configurable: true
        });
        // private methods
        // public methods
        // Intializing Objects
        ScoreBoard.prototype.Start = function () {
            if (!this._isGameOver) {
                this._scoreLabel = new objects.Label("Score :9999 ", "30px", "Arial", "#000000", config.Pivot.MIDRIGHT);
                this._lifeEnemyLabel = new objects.Label("Score :9999 ", "30px", "Arial", "#000000", config.Pivot.MIDRIGHT);
                this._lifePlayerLabel = new objects.Label("Score :99", "30px", "Arial", "#000000", config.Pivot.MIDRIGHT);
            }
            else {
                this._highScoreLabel = new objects.Label("Score :9999 ", "30px", "Arial", "#000000", config.Pivot.MIDRIGHT);
            }
            this.Main();
        };
        // Add objects to current scene
        ScoreBoard.prototype.Main = function () {
            if (!this._isGameOver) {
                managers.GameManager.CurrentScene.addChild(this._scoreLabel);
                managers.GameManager.CurrentScene.addChild(this._lifePlayerLabel);
            }
            else {
                managers.GameManager.CurrentScene.addChild(this._highScoreLabel);
            }
        };
        return ScoreBoard;
    }());
    managers.ScoreBoard = ScoreBoard;
})(managers || (managers = {}));
//# sourceMappingURL=scoreboard.js.map