(function () {

    let canvas: HTMLCanvasElement;
    let stage: createjs.Stage;

    let currentScene: scenes.Scene;

    let stageSound: createjs.AbstractSoundInstance;

    function Init(): void {
        managers.GameManager.ResourceManager = new managers.ResourceManager(Start);
    }

    function Start(): void {

        canvas = document.getElementsByTagName("canvas")[0];

        let height = screen.availHeight - 120;

        managers.GameManager.Screen = new config.Screen(height);

        canvas.width = managers.GameManager.Screen.Width;
        canvas.height = managers.GameManager.Screen.Height;

        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20);
        managers.GameManager.Stage = stage;

        createjs.Ticker.framerate = 60; // game will run at 60fps
        createjs.Ticker.on("tick", Update);

        managers.GameManager.CurrentState = config.Scene.START;

        Main();
    }

    // this is the main game loop
    function Update(): void {

        stage.update();

        if (currentScene) {
            if (managers.GameManager.CurrentState != currentScene.sceneState) {
                Main();
            }

            currentScene.Update();
        }
    }

    function Main(): void {

        stage.removeChild(currentScene);

        if (stageSound)
            stageSound.stop();

        switch (managers.GameManager.CurrentState) {
            case config.Scene.START:

                stageSound = createjs.Sound.play("start");
                stageSound.volume = 0.05;
                stageSound.loop = -1;
                currentScene = new scenes.StartScene();
                break;
            case config.Scene.INSTRUCTION:

                stageSound = createjs.Sound.play("start");
                stageSound.volume = 0.05;
                stageSound.loop = -1;
                currentScene = new scenes.InstructionsScene();
                break;
            case config.Scene.OVER:

                stageSound = createjs.Sound.play("over");
                stageSound.volume = 0.05;
                stageSound.loop = -1;
                currentScene = new scenes.OverScene();
                break;
            case config.Scene.GAMEPLAY:

                stageSound = createjs.Sound.play("battle");
                stageSound.volume = 0.05;
                stageSound.loop = -1;
                currentScene = new scenes.GameplayScene();
                break;
        }
        managers.GameManager.CurrentScene = currentScene;

        stage.addChild(currentScene);
    }

    window.addEventListener("load", Init);
})();